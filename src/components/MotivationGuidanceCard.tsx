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
    <div className="rounded-xl border p-6 bg-white shadow space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          🌱 Motivation & Guidance
        </h2>
        <p className="text-sm text-blue-600 mt-1">
          {moodLabel}
        </p>
      </div>

      {/* Encouragement */}
      <p className="text-gray-800 text-sm leading-relaxed">
        {safeEncouragement}
      </p>

      {/* Tips */}
      <div>
        <h3 className="text-sm font-semibold mb-2">
          Small things that help
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {safeTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Next Step */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
        <span className="font-medium">
          Next step:
        </span>{" "}
        {safeNextStep}
      </div>

      {/* Hint */}
      <div className="text-xs text-gray-500">
        💡 You can say things like “start a focus session” or
        “show my progress” when you’re ready.
      </div>
    </div>
  );
}
