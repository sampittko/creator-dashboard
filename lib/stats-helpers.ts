import weeks from "@/data/weeks.json";

export function getActiveWeeksCount(): number {
  return weeks.filter((w) => w.status !== "not_started").length;
}

export function getActiveWeeksSinceFirstContent(
  type: "blog" | "video"
): number {
  const hasContent =
    type === "blog"
      ? (w: (typeof weeks)[number]) => w.blog !== null
      : (w: (typeof weeks)[number]) => Array.isArray(w.videos) && w.videos.length > 0;

  const firstIndex = weeks.findIndex(hasContent);
  if (firstIndex === -1) return 0;

  const relevantWeeks = weeks
    .slice(firstIndex)
    .filter((w) => w.status !== "not_started");
  return relevantWeeks.length;
}

export function averagePer(total: number, count: number): number {
  return count > 0 ? Math.round(total / count) : 0;
}

export function getTotalProjectWeeks(): number {
  return weeks.filter((w) => w.status !== "not_started").length;
}
