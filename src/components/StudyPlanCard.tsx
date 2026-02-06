"use client";

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
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  return (
    <div className="rounded-xl border p-6 bg-white shadow space-y-6">
\      <div>
        <h2 className="text-2xl font-semibold">
          📚 Draft Study Plan
        </h2>
        <p className="text-sm text-blue-600 mt-1">
          This is a starter plan. Tell me your class, subjects, or priorities to
          personalize it.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Plan duration: {days} days
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">
          Subjects & Priorities
        </h3>
        <div className="flex flex-wrap gap-2">
          {safeSubjects.map((sub, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm border ${priorityStyle(
                sub.priority
              )}`}
            >
              {sub.name} • {sub.priority}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">
          Daily Study Plan (Preview)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: Math.min(days, 6) }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border p-3 bg-gray-50"
            >
              <p className="font-medium text-sm">
                Day {i + 1}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Focus on{" "}
                {safeSubjects[i % safeSubjects.length].name}
              </p>
            </div>
          ))}
        </div>

        {days > 6 && (
          <p className="text-xs text-gray-500 mt-2">
            Showing a preview of the first few days. The plan
            spans {days} days and adapts as you refine it.
          </p>
        )}
      </div>

      <div className="text-sm text-gray-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
        💡 You can say things like:
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
          <li>“I am a 12th class student”</li>
          <li>“My subjects are Physics, Chemistry, Math”</li>
          <li>“Make Math high priority”</li>
        </ul>
      </div>
    </div>
  );
}
