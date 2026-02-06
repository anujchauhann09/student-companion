"use client";

interface Section {
  name: string;
  completionPercentage: number;
}

interface SectionProgressCardProps {
  sections?: Section[] | null;
}

export default function SectionProgressCard({
  sections,
}: SectionProgressCardProps) {
  /**
   * Neutral fallback breakdown.
   * Matches existing app sections without assumptions.
   */
  const safeSections: Section[] =
    sections && sections.length > 0
      ? sections
      : [
          { name: "Study Plan", completionPercentage: 70 },
          { name: "Revision", completionPercentage: 50 },
          { name: "Practice", completionPercentage: 40 },
        ];

  return (
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          📊 Section-wise Progress
        </h2>
        <p className="text-sm text-blue-600">
          See how each part of your preparation is progressing.
        </p>
      </div>

      {/* Section Progress */}
      <div className="space-y-5">
        {safeSections.map((section, index) => {
          const progress = Math.min(
            Math.max(section.completionPercentage, 0),
            100
          );

          /**
           * UI-only trend indicator
           */
          const trend =
            progress >= 70
              ? { icon: "↑", label: "Strong", color: "text-green-600" }
              : progress >= 40
              ? { icon: "→", label: "Stable", color: "text-yellow-600" }
              : { icon: "↓", label: "Needs Focus", color: "text-red-600" };

          return (
            <div key={index} className="space-y-2">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">
                  {section.name}
                </span>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-600">
                    {progress}%
                  </span>
                  <span
                    className={`flex items-center gap-1 font-medium ${trend.color}`}
                  >
                    <span className="text-base leading-none">
                      {trend.icon}
                    </span>
                    {trend.label}
                  </span>
                </div>
              </div>

              {/* Progress Bar + Milestones */}
              <div className="relative">
                {/* Bar */}
                <div className="relative w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Milestone markers */}
                <div className="absolute inset-x-0 top-0 h-2 flex justify-between px-[1px]">
                  {[0, 25, 50, 75, 100].map((mark) => (
                    <span
                      key={mark}
                      className="w-px bg-gray-300"
                      title={`${mark}%`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-2">
        <p className="text-sm font-medium text-blue-800">
          💡 You can say:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
          <li>“Focus more on revision”</li>
          <li>“Which section is weakest?”</li>
          <li>“Improve practice progress”</li>
        </ul>
      </div>
    </div>
  );
}
