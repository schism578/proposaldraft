// app/components/ProposalPreview.tsx

"use client";

import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProposalPDF from "./ProposalPDF";

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface Proposal {
  proposalTitle: string;
  executiveSummary: string;
  scopeOfWork: string[];
  whatIsNotIncluded: string[];
  timeline: string;
  whyUs: string;
  callToAction: string;
  lineItems: LineItem[];
  total: number;
  paymentTerms: string;
  validUntil: string;
}

interface ProposalPreviewProps {
  proposal: Proposal;
  businessName: string;
  contractorName: string;
  contractorEmail: string;
  clientName: string;
  clientAddress: string;
  onBack: () => void;
  hideToolbar?: boolean;
}

export default function ProposalPreview({
  proposal,
  businessName,
  contractorName,
  contractorEmail,
  clientName,
  clientAddress,
  onBack,
  hideToolbar = false,
}: ProposalPreviewProps) {
  const [sendLoading, setSendLoading] = useState(false);
  const [proposalLink, setProposalLink] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSend = async () => {
    setSendLoading(true);
    try {
      const res = await fetch("/api/save-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          contractorName,
          contractorEmail,
          clientName,
          clientAddress,
          proposalData: proposal,
        }),
      });

      const data = await res.json();
      const link = `${window.location.origin}/proposal/${data.id}`;
      setProposalLink(link);
    } catch (err) {
      alert("Failed to generate link. Please try again.");
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">

      {/* Toolbar */}
      {!hideToolbar && (
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            ← Back to form
          </button>
          <div className="flex gap-3">
            <PDFDownloadLink
              document={
                <ProposalPDF
                  proposal={proposal}
                  businessName={businessName}
                  contractorName={contractorName}
                  clientName={clientName}
                  clientAddress={clientAddress}
                />
              }
              fileName={`${clientName.replace(/\s+/g, "-")}-proposal.pdf`}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
            </PDFDownloadLink>
            <button
              onClick={handleSend}
              disabled={sendLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              {sendLoading ? "Generating link..." : "Send to Client →"}
            </button>
          </div>
        </div>
      )}

      {/* Proposal Link Banner */}
      {proposalLink && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-semibold text-green-800 mb-2">
            ✓ Proposal link ready — share this with your client:
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={proposalLink}
              className="flex-1 text-sm border border-green-300 rounded px-3 py-2 bg-white text-gray-700"
            />
            <button
              onClick={() => navigator.clipboard.writeText(proposalLink)}
              className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Proposal Document */}
      <div
        id="proposal-document"
        className="bg-white shadow-lg rounded-2xl overflow-hidden print:shadow-none print:rounded-none"
      >

        {/* Header */}
        <div className="bg-blue-600 text-white px-10 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{businessName}</h1>
              <p className="text-blue-200 text-sm mt-1">{contractorName}</p>
            </div>
            <div className="text-right text-sm text-blue-200">
              <p>Date: {today}</p>
              <p>Valid Until: {proposal.validUntil}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-blue-200 text-xs uppercase tracking-widest mb-1">Prepared For</p>
            <p className="text-white font-semibold text-lg">{clientName}</p>
            <p className="text-blue-200 text-sm">{clientAddress}</p>
          </div>
        </div>

        {/* Proposal Title */}
        <div className="px-10 py-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">{proposal.proposalTitle}</h2>
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">{proposal.executiveSummary}</p>
        </div>

        {/* Scope of Work */}
        <div className="px-10 py-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4">
            Scope of Work
          </h3>
          <ul className="space-y-2">
            {proposal.scopeOfWork.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-0.5 text-blue-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What's Not Included */}
        <div className="px-10 py-6 border-b border-gray-100 bg-gray-50">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Not Included in This Proposal
          </h3>
          <ul className="space-y-2">
            {proposal.whatIsNotIncluded.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                <span className="mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="px-10 py-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Project Timeline
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{proposal.timeline}</p>
        </div>

        {/* Why Us */}
        <div className="px-10 py-6 border-b border-gray-100 bg-blue-50">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Why {businessName}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{proposal.whyUs}</p>
        </div>

        {/* Line Items */}
        <div className="px-10 py-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4">
            Investment Summary
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium text-center">Qty</th>
                <th className="pb-2 font-medium text-right">Unit Price</th>
                <th className="pb-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {proposal.lineItems.map((item, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-3 text-gray-700">{item.description}</td>
                  <td className="py-3 text-center text-gray-500">{item.quantity}</td>
                  <td className="py-3 text-right text-gray-500">
                    ${item.unitPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-right font-medium text-gray-800">
                    ${item.lineTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="pt-4 text-right font-bold text-gray-800">
                  Total
                </td>
                <td className="pt-4 text-right font-bold text-blue-600 text-lg">
                  ${proposal.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Payment Terms */}
        <div className="px-10 py-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Payment Terms
          </h3>
          <p className="text-sm text-gray-700">{proposal.paymentTerms}</p>
        </div>

        {/* Call to Action / Footer */}
        <div className="px-10 py-8 text-center bg-gray-50">
          <p className="text-gray-600 text-sm leading-relaxed max-w-lg mx-auto">
            {proposal.callToAction}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-10 max-w-md mx-auto text-left">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">
                Authorized by
              </p>
              <div className="border-t border-gray-300 pt-2">
                <p className="text-sm font-medium text-gray-700">{contractorName}</p>
                <p className="text-xs text-gray-400">{businessName}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">
                Accepted by
              </p>
              <div className="border-t border-gray-300 pt-2">
                <p className="text-sm font-medium text-gray-700">{clientName}</p>
                <p className="text-xs text-gray-400">Date: ___________</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}