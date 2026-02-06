"use client";

interface DaySchedule {
  day: number;
  tasks?: string[] | null;
}

interface DetailedScheduleCardProps {
  days?: number;
  schedule?: DaySchedule[] | null;
}

export default function DetailedScheduleCard({
  days = 10,
  schedule,
}: DetailedScheduleCardProps) {
  /**
   * Safe fallback tasks for any day.
   * Neutral, age-agnostic, assumption-free.
   */
  const defaultTasks = [
    "Primary Subject Focus",
    "Secondary Subject Review",
    "Light Revision / Practice",
  ];

  /**
   * Build a fully safe, normalized schedule.
   * This guarantees:
   * - Every day exists
   * - Every day has a tasks array
   */
  const normalizedSchedule: DaySchedule[] = Array.from(
    { length: days },
    (_, index) => {
      const dayNumber = index + 1;
      const matchingDay = schedule?.find(
        (d) => d?.day === dayNumber
      );

      return {
        day: dayNumber,
        tasks:
          matchingDay?.tasks && matchingDay.tasks.length > 0
            ? matchingDay.tasks
            : defaultTasks,
      };
    }
  );

  /**
   * UI-only helper (no logic change)
   */
  const getWorkloadMeta = (taskCount: number) => {
    if (taskCount <= 2)
      return {
        label: "Light",
        color: "bg-green-100 text-green-700",
        dots: 1,
      };
    if (taskCount === 3)
      return {
        label: "Moderate",
        color: "bg-yellow-100 text-yellow-700",
        dots: 2,
      };
    return {
      label: "Heavy",
      color: "bg-red-100 text-red-700",
      dots: 3,
    };
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow p-6 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          📅 Detailed Study Schedule
        </h2>
        <p className="text-sm text-blue-600">
          This is a detailed draft — you can refine workload,
          subjects, or priorities anytime.
        </p>
        <p className="text-xs text-gray-500">
          Total duration:{" "}
          <span className="font-medium">{days} days</span>
        </p>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {normalizedSchedule.map((dayPlan) => {
          const workload = getWorkloadMeta(
            dayPlan.tasks!.length
          );

          return (
            <div
              key={dayPlan.day}
              className="
                rounded-xl border
                bg-gradient-to-br from-gray-50 to-white
                p-4 space-y-3
                hover:shadow-sm transition
              "
            >
              {/* Day Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">
                  Day {dayPlan.day}
                </h3>

                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${workload.color}`}
                >
                  {workload.label}
                </span>
              </div>

              {/* Workload Dots */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i < workload.dots
                        ? "bg-amber-400"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-400">
                  {dayPlan.tasks!.length} tasks
                </span>
              </div>

              {/* Tasks */}
              <ul className="space-y-2 text-sm text-gray-700">
                {dayPlan.tasks!.map((task, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Refinement Hint */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-2">
        <p className="text-sm font-medium text-blue-800">
          💡 You can refine this schedule by saying:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
          <li>“Make last 3 days revision only”</li>
          <li>“Reduce workload on weekends”</li>
          <li>“Focus more on weak subjects”</li>
          <li>“Replace Primary Subject with Math”</li>
        </ul>
      </div>
    </div>
  );
}
