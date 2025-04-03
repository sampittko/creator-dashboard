// lib/stats.ts

import weeks from "@/data/weeks.json";
import { AggregatedStats, ExpenseType } from "@/types";

export function getAggregatedStats(): AggregatedStats {
  const result: AggregatedStats = {
    totalMinutesWorked: 0,
    totalDaysWorked: 0,
    totalVideoTakes: 0,
    totalExpenses: {
      all: 0,
      byType: {
        travel: 0,
        equipment: 0,
        subscription: 0,
        website: 0,
        other: 0,
      },
    },
    totalContent: {
      blogCount: 0,
      videoCount: 0,
      perfectWeeks: 0,
    },
    streaks: {
      current: 0,
      longest: 0,
    },
  };

  let currentStreak = 0;
  for (const week of weeks) {
    result.totalMinutesWorked += week.time.minutesWorked;
    result.totalDaysWorked += week.time.daysWorked;
    result.totalVideoTakes += week.content.videoTakes;

    const blog = week.content.blogPublished;
    const video = week.content.videoPublished;

    if (blog) result.totalContent.blogCount++;
    if (video) result.totalContent.videoCount++;
    if (week.weekStatus === "perfect") {
      result.totalContent.perfectWeeks++;
      currentStreak++;
      result.streaks!.longest = Math.max(result.streaks!.longest, currentStreak);
    } else if (week.weekStatus !== "not_started") {
      currentStreak = 0;
    }

    for (const exp of week.expenses || []) {
      const amount = exp.amountEUR || 0;
      const type = exp.type as ExpenseType;

      result.totalExpenses.all += amount;
      result.totalExpenses.byType[type] = (result.totalExpenses.byType[type] || 0) + amount;
    }
  }

  result.streaks!.current = currentStreak;

  return result;
}
