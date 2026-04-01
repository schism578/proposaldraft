// app/page.tsx

"use client";

import { useState } from "react";
import ProposalForm from "./components/ProposalForm";

export default function Home() {
  const [proposal, setProposal] = useState<any>(null);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      {!proposal ? (
        <ProposalForm onProposalGenerated={setProposal} />
      ) : (
        <div className="max-w-2xl mx-auto p-6">
          <pre className="bg-white rounded-lg p-6 text-sm overflow-auto shadow">
            {JSON.stringify(proposal, null, 2)}
          </pre>
          <button
            onClick={() => setProposal(null)}
            className="mt-4 text-blue-600 hover:underline text-sm"
          >
            ← Generate another
          </button>
        </div>
      )}
    </main>
  );
}