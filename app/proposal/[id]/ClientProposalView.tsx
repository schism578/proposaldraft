// app/proposal/[id]/ClientProposalView.tsx

"use client";

import { useState } from "react";
import ProposalPreview from "@/app/components/ProposalPreview";

interface ClientProposalViewProps {
  id: string;
  proposal: any;
  businessName: string;
  contractorName: string;
  clientName: string;
  clientAddress: string;
  contractorEmail: string;
  status: string;
}

export default function ClientProposalView({
  id,
  proposal,
  businessName,
  contractorName,
  contractorEmail,
  clientName,
  clientAddress,
  status: initialStatus,
}: ClientProposalViewProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/accept-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, contractorEmail }),
      });

      if (!res.ok) throw new Error("Failed to accept");
      setStatus("accepted");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Status Banner */}
      {status === "accepted" && (
        <div className="bg-green-500 text-white text-center py-4 text-sm font-semibold">
          ✓ You have accepted this proposal. {businessName} will be in touch shortly.
        </div>
      )}

      {/* Accept Bar */}
      {status === "pending" && (
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Ready to move forward?
            </p>
            <p className="text-xs text-gray-500">
              Review the proposal below and click Accept when ready.
            </p>
          </div>
          <button
            onClick={handleAccept}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors"
          >
            {loading ? "Accepting..." : "Accept Proposal →"}
          </button>
        </div>
      )}

      {/* Proposal */}
      <ProposalPreview
        proposal={proposal}
        businessName={businessName}
        contractorName={contractorName}
        contractorEmail={contractorEmail}
        clientName={clientName}
        clientAddress={clientAddress}
        onBack={() => {}}
        hideToolbar={true}
      />
    </div>
  );
}