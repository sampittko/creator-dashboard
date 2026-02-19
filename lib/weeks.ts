import type { WeeklyEntry } from "@/types";

export type WeekParts = {
  year: number;
  week: number;
};

const WEEK_SEPARATOR = "-W";
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

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

const getIsoWeekStartDate = (weekId: string): Date | null => {
  const { year, week } = parseWeekId(weekId);
  if (year === 0 || week === 0) return null;

  const fourthOfJanuary = new Date(Date.UTC(year, 0, 4));
  const dayOfWeek = fourthOfJanuary.getUTCDay() || 7;
  const isoWeekStart = new Date(fourthOfJanuary);
  isoWeekStart.setUTCDate(fourthOfJanuary.getUTCDate() - dayOfWeek + 1 + (week - 1) * 7);

  return isoWeekStart;
};

export function weeksBetween(startWeekId: string, endWeekId: string): number {
  const start = getIsoWeekStartDate(startWeekId);
  const end = getIsoWeekStartDate(endWeekId);
  if (!start || !end) return 0;

  return Math.round((end.getTime() - start.getTime()) / MS_PER_WEEK);
}

export function sortWeeks<T extends Pick<WeeklyEntry, "weekId">>(weeks: T[]): T[] {
  return [...weeks].sort((a, b) => compareWeekIds(a.weekId, b.weekId));
}
