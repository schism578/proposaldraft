// app/api/generate-proposal/route.ts

import { NextRequest, NextResponse } from "next/server";
import { generateProposal } from "@/lib/generateProposal";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      businessName,
      contractorName,
      clientName,
      clientAddress,
      jobDescription,
      lineItems,
      paymentTerms,
      validDays,
    } = body;

    // Basic validation
    if (!businessName || !clientName || !jobDescription || !lineItems?.length) {
      return NextResponse.json(
        { error: "Missing required fields: businessName, clientName, jobDescription, lineItems" },
        { status: 400 }
      );
    }

    const proposal = await generateProposal({
      businessName,
      contractorName,
      clientName,
      clientAddress,
      jobDescription,
      lineItems,
      paymentTerms,
      validDays,
    });

    return NextResponse.json({ proposal }, { status: 200 });

  } catch (error) {
    console.error("Proposal generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate proposal. Please try again." },
      { status: 500 }
    );
  }
}