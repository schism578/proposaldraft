// app/api/test-email/route.ts

import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/emails";

export async function GET() {
  try {
    await sendWelcomeEmail("ajmarquis3@gmail.com");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}