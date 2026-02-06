import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <main className="max-w-3xl w-full text-center space-y-10">
        {/* Hero */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Student Companion 🎓
          </h1>
          <p className="text-lg text-gray-600">
            An intent-driven study assistant powered by Generative UI.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1">
              📅 Smart Study Planning
            </h3>
            <p className="text-sm text-gray-600">
              Create adaptive study plans instantly based on your exam timeline.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1">
              🔁 Focused Revision
            </h3>
            <p className="text-sm text-gray-600">
              Revise high-priority topics with checklists and quick guidance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1">
              📊 Progress at a Glance
            </h3>
            <p className="text-sm text-gray-600">
              See clear, visual progress snapshots without complex dashboards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1">
              ⏱ Focus & Motivation
            </h3>
            <p className="text-sm text-gray-600">
              Start focus sessions and get calm guidance when you feel stressed.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6">
          <Link
            href="/chat"
            className="inline-block px-8 py-4 rounded-xl text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Start Studying →
          </Link>

          <p className="text-xs text-gray-500 mt-4">
            No setup. Just start typing what you need.
          </p>
        </div>
      </main>
    </div>
  );
}
