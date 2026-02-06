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
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          ✅ Revision Checklist
        </h2>
        <p className="text-sm text-blue-600">
          Track what you’ve revised and what’s pending.
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

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700">
          <span className="font-medium">
            {completedCount}
          </span>{" "}
          of {checklist.length} topics completed
        </span>
        <span className="text-xs text-gray-400">
          {Math.round(
            (completedCount / checklist.length) * 100
          )}
          %
        </span>
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        {checklist.map((item, index) => (
          <label
            key={index}
            className="
              flex items-center justify-between
              rounded-xl border
              bg-gradient-to-br from-gray-50 to-white
              px-4 py-3
              cursor-pointer
              hover:shadow-sm transition
            "
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.status === "Done"}
                onChange={() => toggleStatus(index)}
                className="
                  h-4 w-4 rounded
                  border-gray-300
                  text-blue-600
                  focus:ring-blue-500
                "
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
              className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                item.status === "Done"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }`}
            >
              {item.status}
            </span>
          </label>
        ))}
      </div>

      {/* Hint */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-2">
        <p className="text-sm font-medium text-blue-800">
          💡 You can say:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
          <li>“Mark Core Concepts as done”</li>
          <li>“Add more topics to revise”</li>
          <li>“Reset checklist”</li>
        </ul>
      </div>
    </div>
  );
}
