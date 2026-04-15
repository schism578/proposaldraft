"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Simple, honest pricing
          </h1>
          <p className="text-gray-500 mt-3">
            Start free for 14 days. No credit card required to try.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-8 py-6 text-center">
            <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-2">
              ProposalDraft Pro
            </p>
            <div className="flex items-end justify-center gap-1">
              <span className="text-white text-5xl font-bold">$39</span>
              <span className="text-blue-200 mb-2">/month</span>
            </div>
            <p className="text-blue-200 text-sm mt-2">
              14-day free trial — cancel anytime
            </p>
          </div>

          <div className="px-8 py-6 space-y-4">
            {[
              "Unlimited AI-generated proposals",
              "Branded PDF downloads",
              "Client share links",
              "One-click client acceptance",
              "Email notifications",
              "Professional proposal templates",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-blue-500 font-bold">✓</span>
                {feature}
              </div>
            ))}
          </div>

          <div className="px-8 pb-8 space-y-3">
            <input
              type="email"
              placeholder="Enter your email to get started"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              onClick={handleCheckout}
              disabled={loading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? "Redirecting..." : "Start Free Trial →"}
            </button>
            <p className="text-xs text-gray-400 text-center">
              No credit card required for trial. Cancel anytime.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}