import originalWeeks from "@/data/weeks.json";
import type { WeekStatus, WeeklyEntry } from "@/types";
import { sortWeeks } from "@/lib/weeks";

const INACTIVE_WEEK_STATUSES: WeekStatus[] = ["not_started", "pending", "future"];

const isActiveWeek = (week: WeeklyEntry) =>
  !INACTIVE_WEEK_STATUSES.includes(week.status);

const countActiveWeeksFromFirstMatch = (
  weeks: WeeklyEntry[],
  predicate: (week: WeeklyEntry) => boolean
) => {
  const firstIndex = weeks.findIndex(predicate);
  if (firstIndex === -1) return 0;

  let count = 0;
  for (let index = firstIndex; index < weeks.length; index++) {
    if (isActiveWeek(weeks[index])) count++;
  }

  return count;
};

const calculatePerfectStreaks = (weeks: WeeklyEntry[]) => {
  let longest = 0;
  let running = 0;

  for (const week of weeks) {
    if (!isActiveWeek(week)) continue;

    if (week.status === "perfect") {
      running++;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  let current = 0;
  for (let index = weeks.length - 1; index >= 0; index--) {
    const week = weeks[index];
    if (!isActiveWeek(week)) continue;

    if (week.status === "perfect") {
      current++;
    } else {
      break;
    }
  }

  return { current, longest };
};

const average = (total: number, divisor: number) =>
  divisor > 0 ? Math.round(total / divisor) : 0;

export function getAggregatedStats() {
  const weeks = sortWeeks(originalWeeks as WeeklyEntry[]);

  const blogWeeks = countActiveWeeksFromFirstMatch(
    weeks,
    (week) => week.blog !== null
  );
  const videoWeeks = countActiveWeeksFromFirstMatch(
    weeks,
    (week) => week.videos.length > 0
  );
  const { current: currentStreak, longest: longestStreak } =
    calculatePerfectStreaks(weeks);

  const stats = {
    totalMinutesWorked: 0,
    totalVideoTakes: 0,
    totalVideoKilometersTraveled: 0,
    totalContent: {
      blogCount: 0,
      videoCount: 0,
      perfectWeeks: 0,
    },
    streaks: {
      current: currentStreak,
      longest: longestStreak,
    },
    totalHoursWorked: 0,
    totalProjectWeeks: 0,
    blogWeeks,
    videoWeeks,
    averages: {
      hoursWorked: 0,
      videoTakes: 0,
      videoKilometersTraveled: 0,
      blogs: 0,
      videos: 0,
    },
  };

  for (const week of weeks) {
    if (!isActiveWeek(week)) continue;

    stats.totalProjectWeeks++;
    stats.totalMinutesWorked += week.minutesWorked;

    if (week.videos.length > 0) {
      for (const video of week.videos) {
        stats.totalVideoTakes += video.takes;
        stats.totalVideoKilometersTraveled += video.kilometersRecorded;
      }
      stats.totalContent.videoCount += week.videos.length;
    }

    if (week.blog) stats.totalContent.blogCount++;

    if (week.status === "perfect") stats.totalContent.perfectWeeks++;
  }

  stats.totalHoursWorked = Math.round(stats.totalMinutesWorked / 60);
  stats.averages.hoursWorked = average(
    stats.totalHoursWorked,
    stats.totalProjectWeeks
  );
  stats.averages.videoTakes = average(stats.totalVideoTakes, stats.videoWeeks);
  stats.averages.videoKilometersTraveled = average(
    stats.totalVideoKilometersTraveled,
    stats.videoWeeks
  );
  stats.averages.blogs = average(stats.totalContent.blogCount, stats.blogWeeks);
  stats.averages.videos = average(
    stats.totalContent.videoCount,
    stats.videoWeeks
  );

  return stats;
}
