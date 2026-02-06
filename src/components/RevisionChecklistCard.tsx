"use client";

import { useState } from "react";

interface ChecklistTopic {
  name: string;
  status: "Done" | "Pending";
}

interface RevisionChecklistCardProps {
  subject?: string | null;
  topics?: ChecklistTopic[] | null;
}

export default function RevisionChecklistCard({
  subject,
  topics,
}: RevisionChecklistCardProps) {
  /**
   * Safe fallback checklist.
   * Neutral, no subject assumptions.
   */
  const initialTopics: ChecklistTopic[] =
    topics && topics.length > 0
      ? topics
      : [
          { name: "Core Concepts", status: "Pending" },
          { name: "Important Formulas / Rules", status: "Pending" },
          { name: "Common Mistakes", status: "Pending" },
          { name: "Practice Questions", status: "Pending" },
        ];

  const [checklist, setChecklist] =
    useState<ChecklistTopic[]>(initialTopics);

  const toggleStatus = (index: number) => {
    setChecklist((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              status:
                item.status === "Done"
                  ? "Pending"
                  : "Done",
            }
          : item
      )
    );
  };

  const completedCount = checklist.filter(
    (item) => item.status === "Done"
  ).length;

  return (
    <div className="rounded-xl border p-6 bg-white shadow space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          ✅ Revision Checklist
        </h2>
        <p className="text-sm text-blue-600 mt-1">
          Track what you’ve revised and what’s pending.
        </p>
        {subject && (
          <p className="text-xs text-gray-500 mt-1">
            Subject: {subject}
          </p>
        )}
      </div>

      {/* Progress */}
      <div className="text-sm text-gray-700">
        {completedCount} of {checklist.length} topics completed
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {checklist.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-lg p-3 bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.status === "Done"}
                onChange={() => toggleStatus(index)}
                className="w-4 h-4"
              />
              <span
                className={`text-sm ${
                  item.status === "Done"
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {item.name}
              </span>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full border ${
                item.status === "Done"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-yellow-100 text-yellow-700 border-yellow-200"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
        💡 You can say:
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-gray-700">
          <li>“Mark Core Concepts as done”</li>
          <li>“Add more topics to revise”</li>
          <li>“Reset checklist”</li>
        </ul>
      </div>
    </div>
  );
}
