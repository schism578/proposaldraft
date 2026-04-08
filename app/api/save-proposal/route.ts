// app/api/save-proposal/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      businessName,
      contractorName,
      contractorEmail,
      clientName,
      clientAddress,
      proposalData,
    } = body;

    const { data, error } = await supabase
      .from("proposals")
      .insert({
        business_name: businessName,
        contractor_name: contractorName,
        contractor_email: contractorEmail,
        client_name: clientName,
        client_address: clientAddress,
        proposal_data: proposalData,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({ id: data.id }, { status: 200 });
  } catch (error) {
    console.error("Save proposal error:", error);
    return NextResponse.json(
      { error: "Failed to save proposal." },
      { status: 500 }
    );
  }
}