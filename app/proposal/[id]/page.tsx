// app/proposal/[id]/page.tsx

import { supabase } from "@/lib/supabase";
import ClientProposalView from "./ClientProposalView";
import { notFound } from "next/navigation";

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return notFound();

  return (
    <ClientProposalView
      id={data.id}
      proposal={data.proposal_data}
      businessName={data.business_name}
      contractorName={data.contractor_name}
      clientName={data.client_name}
      clientAddress={data.client_address}
      contractorEmail={data.contractor_email}
      status={data.status}
    />
  );
}