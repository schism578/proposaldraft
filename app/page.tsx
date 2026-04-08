// app/page.tsx

"use client";

import { useState } from "react";
import ProposalForm from "./components/ProposalForm";
import ProposalPreview from "./components/ProposalPreview";

export default function Home() {
  const [proposal, setProposal] = useState<any>(null);
  const [formSnapshot, setFormSnapshot] = useState<any>(null);

  const handleProposalGenerated = (proposal: any, formData: any) => {
  setProposal(proposal);
  setFormSnapshot(formData);
};

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      {!proposal ? (
        <ProposalForm onProposalGenerated={handleProposalGenerated} />
      ) : (
        <ProposalPreview
          proposal={proposal}
          businessName={formSnapshot.businessName}
          contractorName={formSnapshot.contractorName}
          contractorEmail={formSnapshot.contractorEmail} // ADD THIS
          clientName={formSnapshot.clientName}
          clientAddress={formSnapshot.clientAddress}
          onBack={() => setProposal(null)}
        />
      )}
    </main>
  );
}