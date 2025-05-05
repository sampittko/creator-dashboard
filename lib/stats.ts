import originalWeeks from "@/data/weeks.json";

export function getAggregatedStats() {
  const weeks = [...originalWeeks];
  const reversedWeeks = [...originalWeeks].reverse();

  const totalProjectWeeks = weeks.filter(
    (w) => w.weekStatus !== "not_started" && w.weekStatus !== "pending"
  ).length;
  const activeWeeks = totalProjectWeeks;

  const firstBlogIndex = weeks.findIndex((w) => w.content.blogPublished);
  const blogWeeks =
    firstBlogIndex === -1
      ? 0
      : weeks
          .slice(firstBlogIndex)
          .filter(
            (w) => w.weekStatus !== "not_started" && w.weekStatus !== "pending"
          ).length;

  const firstVideoIndex = weeks.findIndex((w) => w.content.videoPublished);
  const videoWeeks =
    firstVideoIndex === -1
      ? 0
      : weeks
          .slice(firstVideoIndex)
          .filter(
            (w) => w.weekStatus !== "not_started" && w.weekStatus !== "pending"
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
    if (week.weekStatus === "not_started" || week.weekStatus === "pending")
      continue;

    stats.totalMinutesWorked += week.time.minutesWorked;
    stats.totalVideoTakes += week.content.videoTakes;
    stats.totalVideoKilometersTraveled += week.content.videoKilometersTraveled;

    if (week.content.blogPublished) stats.totalContent.blogCount++;
    if (week.content.videoPublished) stats.totalContent.videoCount++;

    if (week.weekStatus === "perfect") {
      stats.totalContent.perfectWeeks++;
    }
  }

  let currentStreak = 0;
  let longestStreak = 0;
  for (const week of reversedWeeks) {
    if (week.weekStatus === "not_started") continue;
    if (week.weekStatus === "pending") continue;

    if (week.weekStatus === "perfect") {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      break;
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
