"use client";

import { useEffect, useState } from "react";

interface FocusSessionCardProps {
  durationMinutes?: number | null;
  sessionNumber?: number | null;
}

export default function FocusSessionCard({
  durationMinutes,
  sessionNumber,
}: FocusSessionCardProps) {
  const resolvedMinutes = durationMinutes ?? 25;
  const resolvedTotalSeconds = resolvedMinutes * 60;

  const [secondsLeft, setSecondsLeft] = useState<number>(
    resolvedTotalSeconds
  );
  const [isRunning, setIsRunning] = useState<boolean>(true);

  /**
   * 🔁 IMPORTANT:
   * Reset timer whenever durationMinutes changes
   */
  useEffect(() => {
    setSecondsLeft(resolvedTotalSeconds);
    setIsRunning(true);
  }, [resolvedTotalSeconds]);

  /**
   * ⏱ Timer countdown
   */
  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="rounded-xl border p-6 bg-white shadow space-y-5 text-center">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          🍅 Focus Session
        </h2>
        <p className="text-sm text-blue-600 mt-1">
          Focus for {resolvedMinutes} minutes.
        </p>
      </div>

      {/* Timer */}
      <div className="text-5xl font-mono font-semibold">
        {formattedTime}
      </div>

      {/* Status */}
      <div className="text-sm text-gray-700">
        {secondsLeft > 0
          ? "Focus session in progress"
          : "Session complete 🎉"}
      </div>

      {/* Session Counter */}
      <div className="text-xs text-gray-500">
        Session {sessionNumber ?? 1}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning((p) => !p)}
          className="px-4 py-2 rounded-lg border bg-gray-50 text-sm"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>

        <button
          onClick={() => {
            setSecondsLeft(resolvedTotalSeconds);
            setIsRunning(true);
          }}
          className="px-4 py-2 rounded-lg border bg-gray-50 text-sm"
        >
          Restart
        </button>
      </div>

      {/* Hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-left">
        💡 You can say:
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-gray-700">
          <li>“Focus for 10 minutes”</li>
          <li>“Start another session”</li>
          <li>“Pomodoro for 25 minutes”</li>
        </ul>
      </div>
    </div>
  );
}
