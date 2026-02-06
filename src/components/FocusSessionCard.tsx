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
  const [isRunning, setIsRunning] = useState<boolean>(false);

  /** 🔕 UI-only toggle */
  const [soundEnabled, setSoundEnabled] =
    useState<boolean>(true);

  /**
   * 🔁 Reset timer whenever durationMinutes changes
   */
  useEffect(() => {
    setSecondsLeft(resolvedTotalSeconds);
    setIsRunning(false);
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

  /**
   * UI-only progress (visual)
   */
  const progress =
    ((resolvedTotalSeconds - secondsLeft) /
      resolvedTotalSeconds) *
    100;

  const isComplete = secondsLeft === 0;

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow p-6 space-y-6 text-center ${
        isComplete ? "animate-pulse" : ""
      }`}
    >
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
          🍅 Focus Session
        </h2>
        <p className="text-sm text-blue-600">
          Focus for {resolvedMinutes} minutes.
        </p>
      </div>

      {/* Timer + Progress Ring */}
      <div className="relative flex items-center justify-center">
        {/* Background ring */}
        <div className="absolute h-40 w-40 rounded-full bg-gray-100" />

        {/* Progress ring */}
        <div
          className={`absolute h-40 w-40 rounded-full transition-all duration-500 ${
            isComplete ? "ring-4 ring-green-400/60" : ""
          }`}
          style={{
            background: `conic-gradient(#2563eb ${progress}%, #e5e7eb 0)`,
          }}
        />

        {/* Timer */}
        <div className="relative z-10 bg-white rounded-full h-32 w-32 flex items-center justify-center">
          <span className="text-4xl font-mono font-semibold">
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="text-sm text-gray-700">
        {isComplete
          ? "Session complete 🎉"
          : isRunning
          ? "Focus session in progress"
          : "Session paused"}
      </div>

      {/* Session + Sound */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <span>Session {sessionNumber ?? 1}</span>

        <button
          onClick={() =>
            setSoundEnabled((p) => !p)
          }
          className="
            flex items-center gap-1
            px-2 py-1 rounded-full border
            bg-gray-50 hover:bg-gray-100
            transition
          "
        >
          {soundEnabled ? "🔔 Sound On" : "🔕 Sound Off"}
        </button>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning((p) => !p)}
          className="
            px-4 py-2 rounded-xl border
            bg-gray-50 hover:bg-gray-100
            text-sm font-medium
            transition
          "
        >
          {isRunning ? "Pause" : "Resume"}
        </button>

        <button
          onClick={() => {
            setSecondsLeft(resolvedTotalSeconds);
            setIsRunning(true);
          }}
          className="
            px-4 py-2 rounded-xl border
            bg-gray-50 hover:bg-gray-100
            text-sm font-medium
            transition
          "
        >
          Restart
        </button>
      </div>

      {/* Hint */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-2 text-left">
        <p className="text-sm font-medium text-blue-800">
          💡 You can say:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
          <li>“Focus for 10 minutes”</li>
          <li>“Start another session”</li>
          <li>“Pomodoro for 25 minutes”</li>
        </ul>
      </div>
    </div>
  );
}
