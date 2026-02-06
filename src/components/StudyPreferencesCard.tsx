"use client";

interface StudyPreferencesCardProps {
  intensity?: "Light" | "Moderate" | "Intensive" | null;
  dailyHours?: number | null;
  flexibility?: "Flexible" | "Strict" | null;
}

export default function StudyPreferencesCard({
  intensity,
  dailyHours,
  flexibility,
}: StudyPreferencesCardProps) {
  const safeIntensity = intensity ?? "Moderate";
  const safeFlexibility = flexibility ?? "Flexible";

  const intensityStyle = (level: string) => {
    switch (level) {
      case "Light":
        return "bg-green-100 text-green-700 border-green-200";
      case "Intensive":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <div className="rounded-xl border p-6 bg-white shadow space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          ⚙️ Study Preferences
        </h2>
        <p className="text-sm text-blue-600 mt-1">
          These preferences help personalize your study plan.
        </p>
      </div>

      {/* Preferences Summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="font-medium text-sm">
            Intensity:
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm border ${intensityStyle(
              safeIntensity
            )}`}
          >
            {safeIntensity}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium text-sm">
            Daily Study Time:
          </span>
          <span className="text-sm text-gray-700">
            {dailyHours
              ? `${dailyHours} hours/day`
              : "Balanced (AI-optimized)"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium text-sm">
            Plan Flexibility:
          </span>
          <span className="text-sm text-gray-700">
            {safeFlexibility}
          </span>
        </div>
      </div>

      {/* Hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
        💡 You can say:
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-gray-700">
          <li>“Reduce daily workload”</li>
          <li>“Increase intensity for last few days”</li>
          <li>“Make weekends lighter”</li>
        </ul>
      </div>
    </div>
  );
}
