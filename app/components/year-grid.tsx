'use client';

import { useEffect, useMemo, useState } from "react";
import data from "@/data/weeks.json";
import { WeeklyEntry, WeekStatus } from "@/types";
import { statusToEmoji } from "@/lib/visuals";
import { getISOWeek, getISOWeekYear, getISOWeeksInYear } from "date-fns";

const deriveProjectStartWeek = (weeks: WeeklyEntry[]): string => {
  const firstActiveWeek = weeks.find((week) => week.status !== "not_started");
  return firstActiveWeek?.weekId ?? getCurrentWeekId();
};

function generateAllWeekIds(year: number): string[] {
  const weekCount = getISOWeeksInYear(new Date(year, 0, 4));
  return Array.from(
    { length: weekCount },
    (_, i) => `${year}-W${String(i + 1).padStart(2, "0")}`
  );
}

function getCurrentWeekId(): string {
  const now = new Date();
  return `${getISOWeekYear(now)}-W${String(getISOWeek(now)).padStart(2, "0")}`;
}

function getYearFromWeekId(weekId: string): number {
  return Number(weekId.slice(0, 4));
}

function simpleWeekStatus(
  weekId: string,
  currentWeekId: string,
  existingStatus: WeekStatus | undefined,
  projectStartWeek: string
): WeekStatus | "pending" | "future" | "not_started" {
  if (existingStatus) return existingStatus;
  if (weekId > currentWeekId) return "future";
  if (weekId === currentWeekId) return "pending";
  if (weekId < projectStartWeek) return "not_started";
  return "skipped";
}

export function YearGrid() {
  const weeksData = data as WeeklyEntry[];
  const currentWeekId = getCurrentWeekId();
  const projectStartWeek = useMemo(
    () => deriveProjectStartWeek(weeksData),
    [weeksData]
  );
  const weeksMap = useMemo(
    () => new Map(weeksData.map((w) => [w.weekId, w])),
    [weeksData]
  );

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    weeksData.forEach((week) => years.add(getYearFromWeekId(week.weekId)));
    years.add(getYearFromWeekId(currentWeekId));
    return Array.from(years).sort((a, b) => a - b);
  }, [weeksData, currentWeekId]);

  const defaultYear = useMemo(() => {
    return availableYears[availableYears.length - 1];
  }, [availableYears]);

  const [selectedYear, setSelectedYear] = useState(defaultYear);

  useEffect(() => {
    setSelectedYear((year) =>
      availableYears.includes(year) ? year : defaultYear
    );
  }, [availableYears, defaultYear]);

  const allWeeks = useMemo(
    () => generateAllWeekIds(selectedYear),
    [selectedYear]
  );

  const mergedWeeks = useMemo(() => {
    return allWeeks.map((weekId) => {
      const existing = weeksMap.get(weekId);
      const status = simpleWeekStatus(
        weekId,
        currentWeekId,
        existing?.status,
        projectStartWeek
      );

      return {
        weekId,
        topic: existing?.topic || "",
        status,
        minutesWorked: existing?.minutesWorked || 0,
        wins: existing?.wins || "",
        blog: existing?.blog || null,
        video: existing?.video || null,
      };
    });
  }, [allWeeks, weeksMap, currentWeekId, projectStartWeek]);

  const selectedYearIndex = availableYears.indexOf(selectedYear);
  const hasPrevious = selectedYearIndex > 0;
  const hasNext = selectedYearIndex < availableYears.length - 1;

  return (
    <section className="mb-8 border rounded p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">📅 Weekly Overview</h2>
        <div className="flex items-center gap-2">
          {availableYears.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  hasPrevious &&
                  setSelectedYear(availableYears[selectedYearIndex - 1])
                }
                className="text-sm border rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasPrevious}
                aria-label="Show previous year"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() =>
                  hasNext &&
                  setSelectedYear(availableYears[selectedYearIndex + 1])
                }
                className="text-sm border rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasNext}
                aria-label="Show next year"
              >
                →
              </button>
            </>
          )}
          <span className="text-sm font-medium">{selectedYear}</span>
        </div>
      </div>

      <div className="grid grid-cols-13 gap-1 text-sm">
        {mergedWeeks.map((week) => (
          <div
            key={week.weekId}
            title={`${week.weekId}${week.topic ? " — " + week.topic : ""}`}
            className={`w-6 h-6 flex items-center justify-center border rounded cursor-help ${week.status === "not_started" ? "text-gray-400" : ""
              }`}
          >
            {statusToEmoji(week.status)}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        ✅ Perfect &nbsp; ⚠️ Incomplete &nbsp; ❌ Skipped &nbsp; 🕒 Pending
        &nbsp; ◻️ Future &nbsp; ▫️ Not started
      </div>
    </section>
  );
}
