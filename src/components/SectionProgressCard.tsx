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
    <div className="rounded-xl border p-6 bg-white shadow space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          📊 Section-wise Progress
        </h2>
        <p className="text-sm text-blue-600 mt-1">
          See how each part of your preparation is progressing.
        </p>
      </div>

      {/* Section Progress Bars */}
      <div className="space-y-4">
        {safeSections.map((section, index) => {
          const progress = Math.min(
            Math.max(section.completionPercentage, 0),
            100
          );

          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-800">
                  {section.name}
                </span>
                <span className="text-gray-600">
                  {progress}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
        💡 You can say:
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-gray-700">
          <li>“Focus more on revision”</li>
          <li>“Which section is weakest?”</li>
          <li>“Improve practice progress”</li>
        </ul>
      </div>
    </div>
  );
}
