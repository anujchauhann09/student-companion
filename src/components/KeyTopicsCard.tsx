"use client";

interface Topic {
  name: string;
  importance: "High" | "Medium";
}

interface KeyTopicsCardProps {
  subject?: string | null;
  topics?: Topic[] | null;
}

export default function KeyTopicsCard({
  subject,
  topics,
}: KeyTopicsCardProps) {
  /**
   * Neutral fallback topics.
   * Avoids assuming specific subjects like DSA or college-level material.
   */
  const safeTopics: Topic[] =
    topics && topics.length > 0
      ? topics
      : [
          { name: "Core Concepts", importance: "High" },
          { name: "Frequently Asked Questions", importance: "High" },
          { name: "Common Mistakes", importance: "Medium" },
          { name: "Revision Examples", importance: "Medium" },
        ];

  const badgeStyle = (importance: Topic["importance"]) => {
    return importance === "High"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          🔑 Key Topics to Revise
        </h2>
        <p className="text-sm text-blue-600">
          Focus on these topics first for efficient revision.
        </p>
        {subject && (
          <p className="text-xs text-gray-500">
            Subject:{" "}
            <span className="font-medium text-gray-700">
              {subject}
            </span>
          </p>
        )}
      </div>

      {/* Topics */}
      <div className="space-y-3">
        {safeTopics.map((topic, index) => (
          <div
            key={index}
            className="
              flex items-center justify-between
              rounded-xl border
              bg-gradient-to-br from-gray-50 to-white
              px-4 py-3
              hover:shadow-sm transition
            "
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-800">
                {topic.name}
              </span>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyle(
                topic.importance
              )}`}
            >
              {topic.importance}
            </span>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-2">
        <p className="text-sm font-medium text-blue-800">
          💡 You can say:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
          <li>“Show checklist for these topics”</li>
          <li>“Add more high priority topics”</li>
          <li>“Remove less important ones”</li>
        </ul>
      </div>
    </div>
  );
}
