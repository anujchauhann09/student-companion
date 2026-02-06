"use client";

interface OverallProgressCardProps {
  completionPercentage?: number | null;
  status?: "On Track" | "Needs Attention" | "Behind" | null;
  message?: string | null;
}

export default function OverallProgressCard({
  completionPercentage,
  status,
  message,
}: OverallProgressCardProps) {
  const progress =
    typeof completionPercentage === "number"
      ? Math.min(Math.max(completionPercentage, 0), 100)
      : 60;

  const safeStatus = status ?? "On Track";

  const statusStyle = (value: string) => {
    switch (value) {
      case "Behind":
        return "text-red-700 bg-red-50 border-red-200";
      case "Needs Attention":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      default:
        return "text-green-700 bg-green-50 border-green-200";
    }
  };

  const defaultMessage =
    safeStatus === "Behind"
      ? "You may want to increase focus on high-priority areas."
      : safeStatus === "Needs Attention"
      ? "You’re doing okay, but some areas need more attention."
      : "You’re on track. Keep up the consistent effort.";

  /**
   * UI-only trend indicator
   * (interpretation, not historical logic)
   */
  const trend =
    progress >= 70
      ? { icon: "↑", label: "Improving", color: "text-green-600" }
      : progress >= 40
      ? { icon: "→", label: "Stable", color: "text-yellow-600" }
      : { icon: "↓", label: "Falling Behind", color: "text-red-600" };

  return (
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          📈 Overall Progress
        </h2>
        <p className="text-sm text-blue-600">
          A high-level view of your preparation status.
        </p>
      </div>

      {/* Progress Section */}
      <div className="space-y-4">
        {/* Progress Bar + Milestones */}
        <div className="relative">
          {/* Bar */}
          <div className="relative w-full h-3 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Milestone markers */}
          <div className="absolute inset-x-0 top-0 h-3 flex justify-between px-[1px]">
            {[0, 25, 50, 75, 100].map((mark) => (
              <span
                key={mark}
                className="w-px bg-gray-300"
                title={`${mark}%`}
              />
            ))}
          </div>

          {/* Milestone labels */}
          <div className="mt-2 flex justify-between text-[10px] text-gray-400">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>
            <span className="font-medium text-gray-700">
              {progress}%
            </span>{" "}
            completed
          </span>
          <span>
            <span className="font-medium text-gray-700">
              {100 - progress}%
            </span>{" "}
            remaining
          </span>
        </div>
      </div>

      {/* Status + Trend */}
      <div className="flex items-center gap-4">
        <span
          className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusStyle(
            safeStatus
          )}`}
        >
          {safeStatus}
        </span>

        <span
          className={`text-xs font-medium flex items-center gap-1 ${trend.color}`}
        >
          <span className="text-base leading-none">
            {trend.icon}
          </span>
          {trend.label}
        </span>
      </div>

      {/* Message */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {message ?? defaultMessage}
      </p>

      {/* Hint */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-2">
        <p className="text-sm font-medium text-blue-800">
          💡 You can say:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
          <li>“Break down my progress”</li>
          <li>“Which area needs attention?”</li>
          <li>“Am I behind?”</li>
        </ul>
      </div>
    </div>
  );
}
