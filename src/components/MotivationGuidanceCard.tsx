"use client";

interface MotivationGuidanceCardProps {
  mood?: "Stressed" | "Overwhelmed" | "Uncertain" | "Low" | null;
  encouragement?: string | null;
  tips?: string[] | null;
  nextStep?: string | null;
}

export default function MotivationGuidanceCard({
  mood,
  encouragement,
  tips,
  nextStep,
}: MotivationGuidanceCardProps) {
  const safeEncouragement =
    encouragement ??
    "It’s okay to feel this way. You don’t need to fix everything at once.";

  const safeTips =
    tips && tips.length > 0
      ? tips
      : [
          "Take a slow breath and reset your focus.",
          "Pick just one small task to work on.",
          "Progress matters more than perfection.",
        ];

  const safeNextStep =
    nextStep ?? "Start a 10-minute focus session.";

  const moodLabel = mood
    ? `Feeling ${mood.toLowerCase()}`
    : "You’re not alone";

  return (
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          🌱 Motivation & Guidance
        </h2>
        <p className="text-sm text-blue-600">
          {moodLabel}
        </p>
      </div>

      {/* Encouragement */}
      <div className="rounded-xl bg-gray-50 px-4 py-3">
        <p className="text-sm text-gray-800 leading-relaxed">
          {safeEncouragement}
        </p>
      </div>

      {/* Tips */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-800">
          Small things that help
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {safeTips.map((tip, index) => (
            <li
              key={index}
              className="flex items-start gap-2"
            >
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Step */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-sm">
        <span className="font-medium text-blue-800">
          Next step:
        </span>{" "}
        <span className="text-gray-800">
          {safeNextStep}
        </span>
      </div>

      {/* Hint */}
      <div className="text-xs text-gray-500">
        💡 You can say things like{" "}
        <span className="italic">
          “start a focus session”
        </span>{" "}
        or{" "}
        <span className="italic">
          “show my progress”
        </span>{" "}
        when you’re ready.
      </div>
    </div>
  );
}
