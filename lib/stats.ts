import originalWeeks from "@/data/weeks.json";

export function getAggregatedStats() {
  const weeks = [...originalWeeks];
  const reversedWeeks = [...originalWeeks].reverse();

  const totalProjectWeeks = weeks.filter(
    (w) => w.status !== "not_started" && w.status !== "pending"
  ).length;
  const activeWeeks = totalProjectWeeks;

  const firstBlogIndex = weeks.findIndex((w) => w.blog !== null);
  const blogWeeks =
    firstBlogIndex === -1
      ? 0
      : weeks
          .slice(firstBlogIndex)
          .filter(
            (w) => w.status !== "not_started" && w.status !== "pending"
          ).length;

  const firstVideoIndex = weeks.findIndex((w) => w.video !== null);
  const videoWeeks =
    firstVideoIndex === -1
      ? 0
      : weeks
          .slice(firstVideoIndex)
          .filter(
            (w) => w.status !== "not_started" && w.status !== "pending"
          ).length;

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
      current: 0,
      longest: 0,
    },
    totalHoursWorked: 0,
    totalProjectWeeks,
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
    if (week.status === "not_started" || week.status === "pending")
      continue;

    stats.totalMinutesWorked += week.minutesWorked;
    
    if (week.video) {
      stats.totalVideoTakes += week.video.takes;
      stats.totalVideoKilometersTraveled += week.video.kilometersRecorded;
    }

    if (week.blog) stats.totalContent.blogCount++;
    if (week.video) stats.totalContent.videoCount++;

    if (week.status === "perfect") {
      stats.totalContent.perfectWeeks++;
    }
  }

  let currentStreak = 0;
  for (const week of reversedWeeks) {
    if (week.status === "not_started") continue;
    if (week.status === "pending") continue;

    if (week.status === "perfect") {
      currentStreak++;
    } else {
      break;
    }
  }

  let longestStreak = 0;
  let runningStreak = 0;
  for (const week of weeks) {
    if (week.status === "not_started") continue;
    if (week.status === "pending") continue;

    if (week.status === "perfect") {
      runningStreak++;
      longestStreak = Math.max(longestStreak, runningStreak);
    } else {
      runningStreak = 0;
    }
  }

  stats.streaks.current = currentStreak;
  stats.streaks.longest = longestStreak;
  stats.totalHoursWorked = Math.round(stats.totalMinutesWorked / 60);

  const average = (total: number, weeks: number) =>
    weeks > 0 ? Math.round(total / weeks) : 0;

  stats.averages.hoursWorked = average(stats.totalHoursWorked, activeWeeks);
  stats.averages.videoTakes = average(stats.totalVideoTakes, videoWeeks);
  stats.averages.videoKilometersTraveled = average(
    stats.totalVideoKilometersTraveled,
    videoWeeks
  );
  stats.averages.blogs = average(stats.totalContent.blogCount, blogWeeks);
  stats.averages.videos = average(stats.totalContent.videoCount, videoWeeks);

  return stats;
}
