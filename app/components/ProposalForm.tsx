// app/components/ProposalForm.tsx

"use client";

import { useState } from "react";

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface ProposalFormProps {
  onProposalGenerated: (proposal: any, formData: any) => void;
}

export default function ProposalForm({ onProposalGenerated }: ProposalFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    businessName: "",
    contractorName: "",
    clientName: "",
    clientAddress: "",
    jobDescription: "",
    paymentTerms: "50% deposit required before work begins. Remaining balance due upon completion.",
    validDays: 30,
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLineItemChange = (index: number, field: keyof LineItem, value: string) => {
    const updated = [...lineItems];
    updated[index] = {
      ...updated[index],
      [field]: field === "description" ? value : parseFloat(value) || 0,
    };
    setLineItems(updated);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const total = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice, 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lineItems }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      onProposalGenerated(data.proposal, formData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800">New Proposal</h2>

      {/* Business Info */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Your Business</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Business Name</label>
            <input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apex Roofing LLC"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
            <input
              name="contractorName"
              value={formData.contractorName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jake Reynolds"
            />
          </div>
        </div>
      </section>

      {/* Client Info */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Client Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Client Name</label>
            <input
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sarah Mitchell"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Client Address</label>
            <input
              name="clientAddress"
              value={formData.clientAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 Maple St, Austin, TX 78701"
            />
          </div>
        </div>
      </section>

      {/* Job Description */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Job Details</h3>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Job Description
            <span className="text-gray-400 font-normal ml-1">(plain language is fine)</span>
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full roof replacement on a 2,400 sq ft home. Tear off existing shingles, replace damaged decking, install new 30-year architectural shingles, new gutters on front and back..."
          />
        </div>
      </section>

      {/* Line Items */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Line Items</h3>
        <div className="space-y-3">
          {lineItems.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <input
                className="col-span-6 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description (e.g. Architectural shingles)"
                value={item.description}
                onChange={(e) => handleLineItemChange(index, "description", e.target.value)}
              />
              <input
                type="number"
                className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Qty"
                value={item.quantity}
                min={1}
                onChange={(e) => handleLineItemChange(index, "quantity", e.target.value)}
              />
              <input
                type="number"
                className="col-span-3 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Unit price"
                value={item.unitPrice}
                min={0}
                onChange={(e) => handleLineItemChange(index, "unitPrice", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeLineItem(index)}
                disabled={lineItems.length === 1}
                className="col-span-1 text-red-400 hover:text-red-600 disabled:opacity-20 text-lg font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addLineItem}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          + Add line item
        </button>

        <div className="text-right text-sm font-semibold text-gray-700">
          Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>
      </section>

      {/* Payment Terms */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Terms</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Terms</label>
            <input
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Proposal Valid For (days)</label>
            <input
              type="number"
              name="validDays"
              value={formData.validDays}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {loading ? "Generating proposal..." : "Generate Proposal →"}
      </button>
    </form>
  );
}