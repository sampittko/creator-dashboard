'use client';

import data from "@/data/weeks.json";
import { WeeklyEntry, WeekStatus } from "@/types";
import { statusToEmoji } from "@/lib/visuals";
import { getISOWeek, getISOWeekYear } from "date-fns";

function generateAllWeekIds(year: number): string[] {
  return Array.from({ length: 52 }, (_, i) => `${year}-W${String(i + 1).padStart(2, "0")}`);
}

function getCurrentWeekId(): string {
  const now = new Date();
  return `${getISOWeekYear(now)}-W${String(getISOWeek(now)).padStart(2, "0")}`;
}

function getStatusForWeek(
  weekId: string,
  projectStartWeek: string,
  currentWeekId: string,
  existingStatus?: WeekStatus
): WeekStatus | "future" | "pending" {
  if (weekId > currentWeekId) {
    return "future";
  }

  const isCurrentWeek = weekId === currentWeekId;

  if (isCurrentWeek) {
    return existingStatus || "pending";
  }

  if (existingStatus) return existingStatus;

  if (weekId >= projectStartWeek && weekId < currentWeekId) {
    return "skipped";
  }

  return "not_started";
}

export function YearGrid() {
  const year = new Date().getFullYear();
  const projectStartWeek = "2025-W04";
  const currentWeekId = getCurrentWeekId();

  const weeksData = data as WeeklyEntry[];
  const weeksMap = new Map(weeksData.map((w) => [w.weekId, w]));

  const allWeeks = generateAllWeekIds(year);

  const mergedWeeks = allWeeks.map((weekId) => {
    const existing = weeksMap.get(weekId);

    const isMissing = !existing;
    const isCurrentWeek = weekId === currentWeekId;

    const status = getStatusForWeek(
      weekId,
      projectStartWeek,
      currentWeekId,
      existing?.weekStatus
    );

    return {
      weekId,
      topic: existing?.topic || "",
      content: existing?.content || {
        blogPublished: false,
        videoPublished: false,
        videoTakes: 0,
        publishedAt: {},
        links: {}
      },
      time: existing?.time || { minutesWorked: 0, daysWorked: 0 },
      expenses: existing?.expenses || [],
      notes: existing?.notes || "",
      weekStatus: status,
    };
  });

  return (
    <section className="mb-8 border rounded p-4">
      <h2 className="text-lg font-semibold mb-2">📅 Weekly Overview</h2>
      <div className="grid grid-cols-13 gap-1 text-sm">
        {mergedWeeks.map((week) => (
          <div
            key={week.weekId}
            title={`${week.weekId}${week.topic ? " — " + week.topic : ""}`}
            className={`w-6 h-6 flex items-center justify-center border rounded cursor-help ${week.weekStatus === "not_started" ? "text-gray-400" : ""
              }`}
          >
            {statusToEmoji(week.weekStatus)}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        ✅ Perfect &nbsp; ⚠️ Incomplete &nbsp; ❌ Skipped &nbsp; 🕒 Pending &nbsp; ◻️ Future &nbsp; ▫️ Not started
      </div>
    </section>
  );
}
