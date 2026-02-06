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
        return "text-red-700 bg-red-100 border-red-200";
      case "Needs Attention":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      default:
        return "text-green-700 bg-green-100 border-green-200";
    }
  };

  const defaultMessage =
    safeStatus === "Behind"
      ? "You may want to increase focus on high-priority areas."
      : safeStatus === "Needs Attention"
      ? "You’re doing okay, but some areas need more attention."
      : "You’re on track. Keep up the consistent effort.";

  return (
    <div className="rounded-xl border p-6 bg-white shadow space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          📈 Overall Progress
        </h2>
        <p className="text-sm text-blue-600 mt-1">
          A high-level view of your preparation status.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{progress}% completed</span>
          <span>{100 - progress}% remaining</span>
        </div>
      </div>

      {/* Status */}
      <div
        className={`inline-block px-3 py-1 rounded-full border text-sm ${statusStyle(
          safeStatus
        )}`}
      >
        {safeStatus}
      </div>

      {/* Message */}
      <p className="text-sm text-gray-700">
        {message ?? defaultMessage}
      </p>

      {/* Hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
        💡 You can say:
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-gray-700">
          <li>“Break down my progress”</li>
          <li>“Which area needs attention?”</li>
          <li>“Am I behind?”</li>
        </ul>
      </div>
    </div>
  );
}
