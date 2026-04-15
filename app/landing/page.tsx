"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-100">
        <span className="text-xl font-bold text-blue-600">ProposalDraft</span>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-800">
            Pricing
          </Link>
          <Link
            href="/pricing"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <div className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Built for contractors
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Win more jobs with proposals
          <span className="text-blue-600"> your clients actually read</span>
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
          Stop losing bids to bigger companies with prettier quotes.
          ProposalDraft turns your job details into a professional,
          branded proposal in 60 seconds — ready to send, sign, and win.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pricing"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Start Free 14-Day Trial →
          </Link>
          <a
            href="#how-it-works"
            className="border border-gray-200 hover:border-gray-300 text-gray-600 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
            See How It Works
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          No credit card required · Cancel anytime
        </p>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gray-50 border-y border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">60s</p>
              <p className="text-sm text-gray-500 mt-1">Average proposal generation time</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">$0</p>
              <p className="text-sm text-gray-500 mt-1">To try for 14 days</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">100%</p>
              <p className="text-sm text-gray-500 mt-1">Professional every time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            From messy notes to signed proposal in 3 steps
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Describe the job",
              description:
                "Fill in your client's name, job details, and line items. Plain language is fine — no templates to wrestle with.",
            },
            {
              step: "02",
              title: "AI writes the proposal",
              description:
                "ProposalDraft generates a complete, professional proposal with scope of work, timeline, exclusions, and pricing — in seconds.",
            },
            {
              step: "03",
              title: "Send, get accepted, win",
              description:
                "Share a link with your client. They review, click Accept, and you get an instant email notification. That's it.",
            },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain / Solution */}
      <section className="bg-gray-50 border-y border-gray-100 py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your competitors look more professional than you — even if their work isn't
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Homeowners judge contractors before the first nail is hammered.
                A polished proposal signals that you're organized, trustworthy,
                and worth the price.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                ProposalDraft levels the playing field. You get the same
                professional presentation as companies 10x your size —
                without hiring an office manager or learning design software.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  before: "Handwritten quote on a notepad",
                  after: "Branded PDF proposal with full scope of work",
                },
                {
                  before: "\"I'll email you something later\"",
                  after: "Client link ready in 60 seconds",
                },
                {
                  before: "Chasing clients for a decision",
                  after: "Instant email when they accept",
                },
                {
                  before: "Losing jobs to prettier proposals",
                  after: "Looking like the obvious choice",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 border border-gray-100 flex gap-4 items-start"
                >
                  <div className="flex-1">
                    <p className="text-xs text-red-400 font-medium mb-1">Before</p>
                    <p className="text-sm text-gray-500">{item.before}</p>
                  </div>
                  <div className="text-gray-300 text-lg mt-3">→</div>
                  <div className="flex-1">
                    <p className="text-xs text-green-500 font-medium mb-1">After</p>
                    <p className="text-sm text-gray-800 font-medium">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Everything you need, nothing you don't
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: "⚡",
              title: "AI-powered in seconds",
              description:
                "Describe the job in plain English. GPT-4 writes a complete, professional proposal instantly.",
            },
            {
              icon: "📄",
              title: "Branded PDF downloads",
              description:
                "Every proposal exports as a clean, print-ready PDF with your business name front and center.",
            },
            {
              icon: "🔗",
              title: "Client share links",
              description:
                "Send a unique link instead of an attachment. Clients open it on any device, no login required.",
            },
            {
              icon: "✅",
              title: "One-click acceptance",
              description:
                "Clients accept with a single click. You get an instant email with all the details.",
            },
            {
              icon: "🚫",
              title: "Scope protection built in",
              description:
                "Every proposal includes a \"Not Included\" section to prevent scope creep before it starts.",
            },
            {
              icon: "💰",
              title: "Pays for itself in one job",
              description:
                "Win one extra job per month because your proposal looked better. That's 10–50x your subscription cost.",
            },
          ].map((feature, i) => (
            <div key={i} className="flex gap-4">
              <div className="text-2xl">{feature.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="bg-blue-600 py-24">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to win more jobs?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Start your free 14-day trial today. No credit card required.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white hover:bg-gray-50 text-blue-600 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            Start Free Trial →
          </Link>
          <p className="text-blue-300 text-sm mt-4">
            $39/month after trial · Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="text-sm font-bold text-blue-600">ProposalDraft</span>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ProposalDraft. All rights reserved.
          </p>
          <Link href="/pricing" className="text-xs text-gray-400 hover:text-gray-600">
            Pricing
          </Link>
        </div>
      </footer>

    </main>
  );
}