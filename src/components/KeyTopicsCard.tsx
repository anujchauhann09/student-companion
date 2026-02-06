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
      ? "bg-red-100 text-red-700 border-red-200"
      : "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="rounded-xl border p-6 bg-white shadow space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          🔑 Key Topics to Revise
        </h2>
        <p className="text-sm text-blue-600 mt-1">
          Focus on these topics first for efficient revision.
        </p>
        {subject && (
          <p className="text-xs text-gray-500 mt-1">
            Subject: {subject}
          </p>
        )}
      </div>

      {/* Topics */}
      <div className="space-y-3">
        {safeTopics.map((topic, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-lg p-3 bg-gray-50"
          >
            <span className="text-sm font-medium">
              {topic.name}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs border ${badgeStyle(
                topic.importance
              )}`}
            >
              {topic.importance}
            </span>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
        💡 You can say:
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-gray-700">
          <li>“Show checklist for these topics”</li>
          <li>“Add more high priority topics”</li>
          <li>“Remove less important ones”</li>
        </ul>
      </div>
    </div>
  );
}
