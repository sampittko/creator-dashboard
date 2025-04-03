import weeks from "@/data/weeks.json";

export function getActiveWeeksCount(): number {
  return weeks.filter((w) => w.weekStatus !== "not_started").length;
}

export function getActiveWeeksSinceFirstContent(type: "blog" | "video"): number {
  const firstIndex = weeks.findIndex((w) => w.content[`${type}Published`] === true);
  if (firstIndex === -1) return 0;

  const relevantWeeks = weeks.slice(firstIndex).filter(w => w.weekStatus !== "not_started");
  return relevantWeeks.length;
}

export function averagePer(total: number, count: number): number {
  return count > 0 ? Math.round(total / count) : 0;
}

export function getTotalProjectWeeks(): number {
  return weeks.filter((w) => w.weekStatus !== "not_started").length;
}
