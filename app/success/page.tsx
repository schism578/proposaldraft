import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-500 text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            You're all set!
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Your 14-day free trial has started. Start generating professional
            proposals and win more jobs.
          </p>
          <Link
            href="/dashboard"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Start Creating Proposals →
          </Link>
        </div>
      </div>
    </main>
  );
}