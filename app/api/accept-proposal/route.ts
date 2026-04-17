// app/api/accept-proposal/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { id, contractorEmail } = await req.json();

    // Update proposal status in Supabase
    const { data, error } = await supabase
      .from("proposals")
      .update({
        status: "accepted",
        accepted_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    // Send notification email to contractor
    await resend.emails.send({
      from: "ProposalDraft <onboarding@resend.dev>",
      replyTo: "proposaldraftowner@gmail.com",
      to: contractorEmail,
      subject: `✓ ${data.client_name} accepted your proposal`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">
          <div style="background: #2563eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 20px; margin: 0;">Proposal Accepted! 🎉</h1>
          </div>

          <p style="font-size: 15px; line-height: 1.6;">
            Great news — <strong>${data.client_name}</strong> has accepted your proposal for:
          </p>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #374151;">
              <strong>Project:</strong> ${data.proposal_data.proposalTitle}
            </p>
            <p style="margin: 8px 0 0; font-size: 14px; color: #374151;">
              <strong>Client:</strong> ${data.client_name}
            </p>
            <p style="margin: 8px 0 0; font-size: 14px; color: #374151;">
              <strong>Address:</strong> ${data.client_address}
            </p>
            <p style="margin: 8px 0 0; font-size: 14px; color: #374151;">
              <strong>Total:</strong> $${data.proposal_data.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p style="margin: 8px 0 0; font-size: 14px; color: #374151;">
              <strong>Accepted At:</strong> ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

          <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
            We recommend reaching out to ${data.client_name} within 24 hours to confirm next steps and collect your deposit.
          </p>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">
              Sent by ProposalDraft · You're receiving this because a client accepted one of your proposals.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Accept proposal error:", error);
    return NextResponse.json(
      { error: "Failed to accept proposal." },
      { status: 500 }
    );
  }
}