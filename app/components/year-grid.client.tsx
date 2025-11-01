'use client';

import { useEffect, useMemo, useState } from "react";
import { statusToEmoji } from "@/lib/visuals";
import type { YearGridYear } from "./year-grid";

type YearGridClientProps = {
  years: YearGridYear[];
  defaultYear: number;
};

export function YearGridClient({ years, defaultYear }: YearGridClientProps) {
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const availableYears = useMemo(
    () => years.map((year) => year.year),
    [years]
  );

  useEffect(() => {
    setSelectedYear((year) =>
      availableYears.includes(year) ? year : defaultYear
    );
  }, [availableYears, defaultYear]);

  if (years.length === 0) {
    return null;
  }

  const selectedIndex = availableYears.indexOf(selectedYear);
  const safeIndex = selectedIndex === -1 ? years.length - 1 : selectedIndex;
  const selected = years[safeIndex];

  const hasPrevious = safeIndex > 0;
  const hasNext = safeIndex < years.length - 1;

  return (
    <section className="mb-8 border rounded p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">📅 Weekly Overview</h2>
        <div className="flex items-center gap-2">
          {years.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  hasPrevious && setSelectedYear(years[safeIndex - 1].year)
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
                  hasNext && setSelectedYear(years[safeIndex + 1].year)
                }
                className="text-sm border rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasNext}
                aria-label="Show next year"
              >
                →
              </button>
            </>
          )}
          <span className="text-sm font-medium">{selected.year}</span>
        </div>
      </div>

      <div className="grid grid-cols-13 gap-1 text-sm">
        {selected.weeks.map((week) => {
          const hasTopic =
            typeof week.topic === "string" && week.topic.trim().length > 0;
          const baseTitle = `${week.weekId}${week.topic ? " — " + week.topic : ""
            }`;
          const baseClass = `w-6 h-6 flex items-center justify-center border rounded ${week.status === "not_started" ? "text-gray-400" : ""
            }`;
          const emoji = statusToEmoji(week.status);

          if (hasTopic) {
            return (
              <a
                key={week.weekId}
                href={`#${week.weekId}`}
                title={baseTitle}
                aria-label={baseTitle}
                className={`${baseClass} cursor-pointer hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`}
              >
                {emoji}
              </a>
            );
          }

          return (
            <div
              key={week.weekId}
              title={baseTitle}
              className={`${baseClass} cursor-help`}
            >
              {emoji}
            </div>
          );
        })}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        ✅ Perfect &nbsp; ⚠️ Incomplete &nbsp; ❌ Skipped &nbsp; 🕒 Pending
        &nbsp; ◻️ Future &nbsp; ▫️ Not started
      </div>
    </section>
  );
}
