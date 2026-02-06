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
      const matchingDay =
        schedule?.find((d) => d?.day === dayNumber);

      return {
        day: dayNumber,
        tasks:
          matchingDay?.tasks && matchingDay.tasks.length > 0
            ? matchingDay.tasks
            : defaultTasks,
      };
    }
  );

  return (
    <div className="rounded-xl border p-6 bg-white shadow space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          📅 Detailed Study Schedule
        </h2>
        <p className="text-sm text-blue-600 mt-1">
          This is a detailed draft. You can refine subjects,
          priorities, or workload anytime.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Total duration: {days} days
        </p>
      </div>

      {/* Schedule */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {normalizedSchedule.map((dayPlan) => (
          <div
            key={dayPlan.day}
            className="border rounded-lg p-4 bg-gray-50"
          >
            <h3 className="font-semibold text-sm mb-2">
              Day {dayPlan.day}
            </h3>

            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {dayPlan.tasks!.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Refinement Hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
        💡 You can refine this schedule by saying:
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-gray-700">
          <li>“Make last 3 days revision only”</li>
          <li>“Reduce workload on weekends”</li>
          <li>“Focus more on weak subjects”</li>
          <li>“Replace Primary Subject with Math”</li>
        </ul>
      </div>
    </div>
  );
}
