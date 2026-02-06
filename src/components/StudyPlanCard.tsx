"use client";

import { useState } from "react";

interface Subject {
  name: string;
  priority: "High" | "Medium" | "Low";
}

interface StudyPlanCardProps {
  days?: number;
  subjects?: Subject[] | null;
}

export default function StudyPlanCard({
  days = 10,
  subjects,
}: StudyPlanCardProps) {
  const [expanded, setExpanded] = useState(false);

  const safeSubjects: Subject[] =
    subjects && subjects.length > 0
      ? subjects
      : [
          { name: "Core Subject 1", priority: "High" },
          { name: "Core Subject 2", priority: "Medium" },
          { name: "Core Subject 3", priority: "Low" },
        ];

  const priorityStyle = (priority: Subject["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900";
      case "Medium":
        return "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900";
      case "Low":
        return "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900";
    }
  };

  const visibleDays = expanded ? days : Math.min(days, 6);

  return (
    <div
      className="
        relative overflow-hidden rounded-2xl border
        bg-white dark:bg-zinc-900
        border-gray-200 dark:border-zinc-800
        shadow-sm hover:shadow-md
        transition-shadow
        p-6 space-y-8
      "
    >
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 flex items-center gap-2">
          📚 Draft Study Plan
        </h2>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          This is a starter plan — refine it to make it yours.
        </p>
        <p className="text-xs text-gray-500 dark:text-zinc-400">
          ⏳ Plan duration: <span className="font-medium">{days} days</span>
        </p>
      </div>

      {/* Subjects */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-zinc-300">
          Subjects & Priorities
        </h3>

        <div className="flex flex-wrap gap-2">
          {safeSubjects.map((sub, index) => (
            <span
              key={index}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1 ${priorityStyle(
                sub.priority
              )}`}
            >
              <span>{sub.name}</span>
              <span className="opacity-60">•</span>
              <span>{sub.priority}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Daily Plan */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-zinc-300">
          Daily Study Plan (Preview)
        </h3>

        <div
          className={`
            grid grid-cols-1 sm:grid-cols-2 gap-4
            overflow-hidden transition-all duration-500 ease-in-out
            ${expanded ? "max-h-[2000px]" : "max-h-[520px]"}
          `}
        >
          {Array.from({ length: visibleDays }).map((_, i) => (
            <div
              key={i}
              className="
                rounded-xl border
                bg-gradient-to-br from-gray-50 to-white
                dark:from-zinc-800 dark:to-zinc-900
                border-gray-200 dark:border-zinc-700
                p-4 hover:shadow-sm transition
              "
            >
              <p className="text-sm font-semibold text-gray-800 dark:text-zinc-100">
                Day {i + 1}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">
                Focus on{" "}
                <span className="font-medium">
                  {safeSubjects[i % safeSubjects.length].name}
                </span>
              </p>
            </div>
          ))}
        </div>

        {days > 6 && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="
              text-xs font-medium
              text-blue-600 dark:text-blue-400
              hover:underline transition
            "
          >
            {expanded ? "▲ Collapse full plan" : "▼ Expand full plan"}
          </button>
        )}
      </div>

      {/* Hint Box */}
      <div
        className="
          rounded-xl border
          border-blue-200 dark:border-blue-900
          bg-blue-50/60 dark:bg-blue-950/40
          p-4 space-y-2
        "
      >
        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
          💡 Try saying:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-blue-900/80 dark:text-blue-200/80">
          <li>“I am a 12th class student”</li>
          <li>“My subjects are Physics, Chemistry, Math”</li>
          <li>“Make Math high priority”</li>
        </ul>
      </div>
    </div>
  );
}
