import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6">
      <main className="max-w-4xl w-full text-center space-y-14">
        {/* Hero */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Student Companion 🎓
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            An intent-driven study assistant powered by Generative UI —
            built to help you plan, focus, and progress without friction.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="group bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
              📅 Smart Study Planning
            </h3>
            <p className="text-sm text-gray-600">
              Create adaptive study plans instantly based on your exam timeline.
            </p>
          </div>

          <div className="group bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
              🔁 Focused Revision
            </h3>
            <p className="text-sm text-gray-600">
              Revise high-priority topics with checklists and quick guidance.
            </p>
          </div>

          <div className="group bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
              📊 Progress at a Glance
            </h3>
            <p className="text-sm text-gray-600">
              See clear, visual progress snapshots without complex dashboards.
            </p>
          </div>

          <div className="group bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
              ⏱ Focus & Motivation
            </h3>
            <p className="text-sm text-gray-600">
              Start focus sessions and get calm guidance when you feel stressed.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Link
            href="/chat"
            className="
              inline-flex items-center gap-2
              px-8 py-4 rounded-xl
              text-lg font-semibold
              bg-blue-600 text-white
              hover:bg-blue-700
              transition
              shadow-sm hover:shadow-md
            "
          >
            Start Studying
            <span className="text-xl">→</span>
          </Link>

          <p className="text-xs text-gray-500 mt-4">
            No setup. Just start typing what you need.
          </p>
        </div>
      </main>
    </div>
  );
}
