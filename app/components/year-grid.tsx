import data from "@/data/weeks.json";
import { WeeklyEntry, WeekStatus } from "@/types";
import { getISOWeek, getISOWeekYear, getISOWeeksInYear } from "date-fns";
import { statusToEmoji } from "@/lib/visuals";
import { compareWeekIds } from "@/lib/weeks";

type DerivedWeekStatus = WeekStatus | "pending" | "future" | "not_started";

export type YearGridWeek = {
  weekId: string;
  status: DerivedWeekStatus;
  topic?: string;
};

export type YearGridYear = {
  year: number;
  weeks: YearGridWeek[];
};

const getCurrentWeekId = () => {
  const now = new Date();
  return `${getISOWeekYear(now)}-W${String(getISOWeek(now)).padStart(2, "0")}`;
};

const getYearFromWeekId = (weekId: string) => Number(weekId.slice(0, 4));

const deriveProjectStartWeek = (weeks: WeeklyEntry[], fallbackWeekId: string) => {
  const firstActiveWeek = weeks.find((week) => week.status !== "not_started");
  return firstActiveWeek?.weekId ?? fallbackWeekId;
};

function generateAllWeekIds(year: number): string[] {
  const weekCount = getISOWeeksInYear(new Date(year, 0, 4));
  return Array.from(
    { length: weekCount },
    (_, i) => `${year}-W${String(i + 1).padStart(2, "0")}`
  );
}

function simpleWeekStatus(
  weekId: string,
  currentWeekId: string,
  existingStatus: WeekStatus | undefined,
  projectStartWeek: string
): DerivedWeekStatus {
  if (existingStatus) return existingStatus;
  const compareToCurrent = compareWeekIds(weekId, currentWeekId);
  if (compareToCurrent > 0) return "future";
  if (compareToCurrent === 0) return "pending";
  if (compareWeekIds(weekId, projectStartWeek) < 0) return "not_started";
  return "skipped";
}

export function YearGrid() {
  const weeksData = data as WeeklyEntry[];
  const currentWeekId = getCurrentWeekId();
  const projectStartWeek = deriveProjectStartWeek(weeksData, currentWeekId);
  const weeksMap = new Map(weeksData.map((w) => [w.weekId, w]));

  const yearsSet = new Set<number>();
  weeksData.forEach((week) => yearsSet.add(getYearFromWeekId(week.weekId)));
  yearsSet.add(getYearFromWeekId(currentWeekId));

  const availableYears = Array.from(yearsSet).sort((a, b) => a - b);
  if (availableYears.length === 0) {
    availableYears.push(getYearFromWeekId(currentWeekId));
  }

  const years: YearGridYear[] = availableYears.map((year) => {
    const weeks = generateAllWeekIds(year).map((weekId) => {
      const existing = weeksMap.get(weekId);
      const status = simpleWeekStatus(
        weekId,
        currentWeekId,
        existing?.status,
        projectStartWeek
      );

      return {
        weekId,
        status,
        topic: existing?.topic || undefined,
      };
    });

    return { year, weeks };
  });

  if (years.length === 0) {
    return null;
  }

  const weekLegend =
    "✅ Perfect  ⚠️ Incomplete  ❌ Skipped  🕒 Pending  ◻️ Future  ▫️ Not started";

  return (
    <section className="mb-8 border rounded p-4">
      <h2 className="text-lg font-semibold mb-2">📅 Weekly Overview</h2>

      <div className="flex flex-col gap-4">
        {years.map((year) => (
          <div key={year.year} id={`year-${year.year}`}>
            <div className="mb-1 flex items-center justify-between text-sm font-medium text-gray-600 dark:text-gray-300">
              <span>{year.year}</span>
              <span>{year.weeks.length} weeks</span>
            </div>
            <div className="grid grid-cols-13 gap-1 text-sm">
              {year.weeks.map((week) => {
                const hasTopic =
                  typeof week.topic === "string" && week.topic.trim().length > 0;
                const baseTitle = `${week.weekId}${
                  week.topic ? " — " + week.topic : ""
                }`;
                const baseClass = `w-6 h-6 flex items-center justify-center border rounded ${
                  week.status === "not_started" ? "text-gray-400" : ""
                }`;
                const emoji = statusToEmoji(week.status);

                if (hasTopic) {
                  return (
                    <a
                      key={week.weekId}
                      href={`#${week.weekId}`}
                      title={baseTitle}
                      aria-label={baseTitle}
                      className={`${baseClass} cursor-pointer hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-500`}
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
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        {weekLegend.split("  ").map((label) => (
          <span key={label} className="inline-block mr-2 last:mr-0">
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
