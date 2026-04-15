// app/api/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/emails";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const session = event.data.object as any;

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        console.log("✓ checkout.session.completed received");

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        );

        await supabase.from("customers").upsert({
          email: session.customer_email.toLowerCase(), // normalize here
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          subscription_status: subscription.status,
          trial_ends_at: new Date(
            subscription.trial_end! * 1000
          ).toISOString(),
        }, { onConflict: "email" });

        console.log("✓ Customer saved, sending welcome email to:", session.customer_email);
        const email = session.customer_email.toLowerCase();
          await sendWelcomeEmail(email);
          console.log("✓ Welcome email sent to:", email);
        break;
      }

      case "customer.subscription.updated": {
        await supabase
          .from("customers")
          .update({ subscription_status: session.status })
          .eq("stripe_subscription_id", session.id);
        break;
      }

      case "customer.subscription.deleted": {
        await supabase
          .from("customers")
          .update({ subscription_status: "canceled" })
          .eq("stripe_subscription_id", session.id);
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed." },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}