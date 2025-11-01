import data from "@/data/weeks.json";
import { WeeklyEntry, WeekStatus } from "@/types";
import { getISOWeek, getISOWeekYear, getISOWeeksInYear } from "date-fns";
import { YearGridClient } from "./year-grid.client";

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
  if (weekId > currentWeekId) return "future";
  if (weekId === currentWeekId) return "pending";
  if (weekId < projectStartWeek) return "not_started";
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

  const defaultYear =
    years[years.length - 1]?.year ?? getYearFromWeekId(currentWeekId);

  return <YearGridClient years={years} defaultYear={defaultYear} />;
}
