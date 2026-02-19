import type { WeeklyEntry } from "@/types";

export type WeekParts = {
  year: number;
  week: number;
};

const WEEK_SEPARATOR = "-W";

export function parseWeekId(weekId: string): WeekParts {
  const [yearPart, weekPart] = weekId.split(WEEK_SEPARATOR);
  const year = Number(yearPart);
  const week = Number(weekPart);

  if (Number.isNaN(year) || Number.isNaN(week)) {
    return { year: 0, week: 0 };
  }

  return { year, week };
}

export function compareWeekIds(firstWeekId: string, secondWeekId: string): number {
  const first = parseWeekId(firstWeekId);
  const second = parseWeekId(secondWeekId);

  if (first.year === second.year) {
    return first.week - second.week;
  }

  return first.year - second.year;
}

export function sortWeeks<T extends Pick<WeeklyEntry, "weekId">>(weeks: T[]): T[] {
  return [...weeks].sort((a, b) => compareWeekIds(a.weekId, b.weekId));
}
