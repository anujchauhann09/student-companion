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
        return "bg-green-50 text-green-700 border-green-200";
      case "Intensive":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  /**
   * UI-only visual mapping (no logic impact)
   */
  const intensityBarWidth = () => {
    switch (safeIntensity) {
      case "Light":
        return "w-1/3 bg-green-500";
      case "Intensive":
        return "w-full bg-red-500";
      default:
        return "w-2/3 bg-yellow-400";
    }
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          ⚙️ Study Preferences
        </h2>
        <p className="text-sm text-blue-600">
          These preferences help personalize your study plan.
        </p>
      </div>

      {/* Preferences */}
      <div className="space-y-5">
        {/* Intensity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Intensity
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-300 ${intensityStyle(
                safeIntensity
              )}`}
            >
              {safeIntensity}
            </span>
          </div>

          {/* Visual Intensity Meter */}
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${intensityBarWidth()}`}
            />
          </div>
        </div>

        {/* Daily Hours */}
        <div className="flex items-center justify-between transition-all duration-300">
          <span className="text-sm font-medium text-gray-700">
            Daily Study Time
          </span>
          <span className="text-sm text-gray-800">
            {dailyHours ? (
              <span className="font-medium">
                {dailyHours} hrs/day
              </span>
            ) : (
              <span className="italic text-gray-500">
                Balanced (AI-optimized)
              </span>
            )}
          </span>
        </div>

        {/* Flexibility */}
        <div className="flex items-center justify-between transition-all duration-300">
          <span className="text-sm font-medium text-gray-700">
            Plan Flexibility
          </span>
          <span className="text-sm font-medium text-gray-800">
            {safeFlexibility}
          </span>
        </div>
      </div>

      {/* Hint */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-2">
        <p className="text-sm font-medium text-blue-800">
          💡 You can say:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
          <li>“Reduce daily workload”</li>
          <li>“Increase intensity for last few days”</li>
          <li>“Make weekends lighter”</li>
        </ul>
      </div>
    </div>
  );
}
