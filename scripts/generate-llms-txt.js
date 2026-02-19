'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT_DIR, 'data', 'weeks.json');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const OUTPUT_PATH = path.join(PUBLIC_DIR, 'llms.txt');

const STATUS_LABELS = {
  not_started: 'Not Started',
  future: 'Future',
  pending: 'Pending',
  perfect: 'Perfect 🟢',
  incomplete: 'Incomplete 🟠',
  skipped: 'Skipped 🔴',
};

const INACTIVE_WEEK_STATUSES = new Set(['not_started', 'pending', 'future']);

const getWeekContents = (week) =>
  week && Array.isArray(week.contents) ? week.contents : [];

const getWeekTopics = (week) =>
  getWeekContents(week)
    .map((content) =>
      typeof content.topic === 'string' ? content.topic.trim() : ''
    )
    .filter((topic) => topic.length > 0);

const getWeekVideos = (week) =>
  getWeekContents(week).flatMap((content) =>
    Array.isArray(content.videos)
      ? content.videos.map((video) => ({ ...video, topic: content.topic }))
      : []
  );

const getWeekBlogs = (week) =>
  getWeekContents(week).flatMap((content) =>
    content.blog ? [{ topic: content.topic, blog: content.blog }] : []
  );

const weekHasBlog = (week) => getWeekBlogs(week).length > 0;
const weekHasVideo = (week) => getWeekVideos(week).length > 0;

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_WEEK = 7 * MS_PER_DAY;

function statusToEmoji(status) {
  switch (status) {
    case 'perfect':
      return '✅';
    case 'incomplete':
      return '⚠️';
    case 'skipped':
      return '❌';
    case 'pending':
      return '🕒';
    case 'future':
      return '◻️';
    case 'not_started':
    default:
      return '▫️';
  }
}

function loadWeeks() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

function parseWeekId(weekId) {
  const [yearPart, weekPart] = weekId.split('-W');
  const year = Number(yearPart);
  const week = Number(weekPart);

  if (Number.isNaN(year) || Number.isNaN(week)) {
    return { year: 0, week: 0 };
  }

  return { year, week };
}

function compareWeekIds(firstWeekId, secondWeekId) {
  const first = parseWeekId(firstWeekId);
  const second = parseWeekId(secondWeekId);

  if (first.year === second.year) {
    return first.week - second.week;
  }

  return first.year - second.year;
}

function getIsoWeekStartDate(weekId) {
  const { year, week } = parseWeekId(weekId);
  if (!year || !week) return null;

  const fourthOfJanuary = new Date(Date.UTC(year, 0, 4));
  const dayOfWeek = fourthOfJanuary.getUTCDay() || 7;
  const isoWeekStart = new Date(fourthOfJanuary);
  isoWeekStart.setUTCDate(
    fourthOfJanuary.getUTCDate() - dayOfWeek + 1 + (week - 1) * 7
  );

  return isoWeekStart;
}

function weeksBetween(startWeekId, endWeekId) {
  const start = getIsoWeekStartDate(startWeekId);
  const end = getIsoWeekStartDate(endWeekId);
  if (!start || !end) return 0;

  return Math.round((end.getTime() - start.getTime()) / MS_PER_WEEK);
}

function sortWeeks(weeks) {
  return [...weeks].sort((a, b) => compareWeekIds(a.weekId, b.weekId));
}

function isActiveWeek(week) {
  return !INACTIVE_WEEK_STATUSES.has(week.status);
}

function countActiveWeeksFromFirstMatch(weeks, predicate) {
  const firstIndex = weeks.findIndex(predicate);
  if (firstIndex === -1) return 0;

  let count = 0;
  for (let index = firstIndex; index < weeks.length; index++) {
    if (isActiveWeek(weeks[index])) count++;
  }

  return count;
}

function calculatePerfectStreaks(weeks) {
  let longest = 0;
  let running = 0;

  for (const week of weeks) {
    if (!isActiveWeek(week)) continue;

    if (week.status === 'perfect') {
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

    if (week.status === 'perfect') {
      current++;
    } else {
      break;
    }
  }

  return { current, longest };
}

function average(total, divisor) {
  return divisor > 0 ? Math.round(total / divisor) : 0;
}

function getAggregatedStats(weeks) {
  const sortedWeeks = sortWeeks(weeks);

  const blogWeeks = countActiveWeeksFromFirstMatch(sortedWeeks, weekHasBlog);
  const videoWeeks = countActiveWeeksFromFirstMatch(sortedWeeks, weekHasVideo);
  const { current: currentStreak, longest: longestStreak } =
    calculatePerfectStreaks(sortedWeeks);

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

  for (const week of sortedWeeks) {
    if (!isActiveWeek(week)) continue;

    stats.totalProjectWeeks++;
    stats.totalMinutesWorked += week.minutesWorked;

    const weekVideos = getWeekVideos(week);
    const weekBlogs = getWeekBlogs(week);

    if (weekVideos.length > 0) {
      for (const video of weekVideos) {
        stats.totalVideoTakes += video.takes;
        stats.totalVideoKilometersTraveled += video.kilometersRecorded;
      }
      stats.totalContent.videoCount += weekVideos.length;
    }

    if (weekBlogs.length > 0) {
      stats.totalContent.blogCount += weekBlogs.length;
    }
    if (week.status === 'perfect') stats.totalContent.perfectWeeks++;
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

function getISOWeek(date) {
  const utcDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((utcDate - yearStart) / MS_PER_DAY + 1) / 7);
}

function getISOWeekYear(date) {
  const utcDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day);
  return utcDate.getUTCFullYear();
}

function getISOWeeksInYear(year) {
  return getISOWeek(new Date(Date.UTC(year, 11, 28)));
}

function getCurrentWeekId() {
  const now = new Date();
  const weekYear = getISOWeekYear(now);
  const isoWeek = String(getISOWeek(now)).padStart(2, '0');
  return `${weekYear}-W${isoWeek}`;
}

function getYearFromWeekId(weekId) {
  return Number(weekId.slice(0, 4));
}

function deriveProjectStartWeek(weeks, fallbackWeekId) {
  const firstActiveWeek = weeks.find((week) => week.status !== 'not_started');
  return firstActiveWeek ? firstActiveWeek.weekId : fallbackWeekId;
}

function generateAllWeekIds(year) {
  const weekCount = getISOWeeksInYear(year);
  return Array.from(
    { length: weekCount },
    (_, index) => `${year}-W${String(index + 1).padStart(2, '0')}`
  );
}

function normalizePendingStatus(
  weekId,
  currentWeekId,
  projectStartWeek,
  hasPendingHold,
  isExplicitPending
) {
  const compareToCurrent = compareWeekIds(weekId, currentWeekId);
  if (compareToCurrent > 0) return 'future';
  if (compareToCurrent === 0) {
    if (hasPendingHold && !isExplicitPending) return 'future';
    return 'pending';
  }
  if (isExplicitPending && weeksBetween(weekId, currentWeekId) <= 1) {
    return 'pending';
  }
  if (compareWeekIds(weekId, projectStartWeek) < 0) return 'not_started';
  return 'skipped';
}

function simpleWeekStatus(
  weekId,
  currentWeekId,
  existingStatus,
  projectStartWeek,
  hasPendingHold,
  isExplicitPending
) {
  if (existingStatus && existingStatus !== 'pending') {
    return existingStatus;
  }
  return normalizePendingStatus(
    weekId,
    currentWeekId,
    projectStartWeek,
    hasPendingHold,
    isExplicitPending
  );
}

function buildYearGrid(weeksData) {
  const currentWeekId = getCurrentWeekId();
  const projectStartWeek = deriveProjectStartWeek(weeksData, currentWeekId);
  const weeksMap = new Map(weeksData.map((week) => [week.weekId, week]));
  const pendingHoldActive = weeksData.some(
    (week) =>
      week.status === 'pending' &&
      compareWeekIds(week.weekId, currentWeekId) < 0 &&
      weeksBetween(week.weekId, currentWeekId) <= 1
  );

  const yearsSet = new Set();
  weeksData.forEach((week) => yearsSet.add(getYearFromWeekId(week.weekId)));
  yearsSet.add(getYearFromWeekId(currentWeekId));

  const availableYears = Array.from(yearsSet).sort((a, b) => a - b);
  if (availableYears.length === 0) {
    availableYears.push(getYearFromWeekId(currentWeekId));
  }

  return availableYears.map((year) => {
    const weeks = generateAllWeekIds(year).map((weekId) => {
      const existing = weeksMap.get(weekId);
      const normalizedStatus = simpleWeekStatus(
        weekId,
        currentWeekId,
        existing?.status,
        projectStartWeek,
        pendingHoldActive,
        existing?.status === 'pending'
      );

      const topics = getWeekTopics(existing);
      const topic = topics.length > 0 ? topics.join(' • ') : '';

      return {
        weekId,
        status: normalizedStatus,
        topic: topic.length > 0 ? topic : undefined,
      };
    });

    return { year, weeks };
  });
}

function renderYearGridSection(years) {
  const lines = [];
  lines.push('## 📅 Weekly Overview');
  lines.push('');
  lines.push(
    'Legend: ✅ Perfect | ⚠️ Incomplete | ❌ Skipped | 🕒 Pending | ◻️ Future | ▫️ Not started'
  );
  lines.push('');

  years.forEach((year) => {
    lines.push(`### ${year.year} — ${year.weeks.length} weeks`);
    year.weeks.forEach((week) => {
      const topicSuffix = week.topic ? ` ${week.topic}` : '';
      lines.push(
        `- ${week.weekId}: ${statusToEmoji(week.status)} ${
          STATUS_LABELS[week.status] ?? week.status
        }${topicSuffix}`
      );
    });
    lines.push('');
  });

  return lines.join('\n').trim();
}

function renderAggregatedStats(stats) {
  return [
    '## 📊 Aggregated Stats',
    '',
    `- 📆 Project Weeks: ${stats.totalProjectWeeks}`,
    `- 🕒 Hours Spent: ${stats.totalHoursWorked}h (avg ${stats.averages.hoursWorked}h/week)`,
    `- 📹 Videos Created: ${stats.totalContent.videoCount} (avg ${stats.averages.videos}/week in ${stats.videoWeeks} video weeks)`,
    `- 🎬 Video Recording Attempts: ${stats.totalVideoTakes} (avg ${stats.averages.videoTakes}/week in ${stats.videoWeeks} video weeks) "Bring value. Next action. Repeat."`,
    `- 🚗 Travel Distance Covered: ${stats.totalVideoKilometersTraveled}km (avg ${stats.averages.videoKilometersTraveled}km/week in ${stats.videoWeeks} video weeks)`,
    `- 🔥 Perfect Weeks: ${stats.totalContent.perfectWeeks}`,
    `- ⚡ Current Streak: ${stats.streaks?.current ?? 0}`,
    `- 🏆 Longest Streak: ${stats.streaks?.longest ?? 0} "Don't break the chain."`,
    '',
  ].join('\n');
}

function formatLinkEntries(week) {
  const links = [];

  const videos = getWeekVideos(week);
  videos.forEach((video, index) => {
    const label =
      videos.length > 1 ? `Video #${index + 1}` : 'Video';
    const topicSuffix =
      video.topic && video.topic.trim().length > 0
        ? ` — ${video.topic}`
        : '';
    links.push({ label: `${label}${topicSuffix}`, url: video.url });
  });

  const blogs = getWeekBlogs(week);
  blogs.forEach(({ blog, topic }, index) => {
    const label = blogs.length > 1 ? `Blog #${index + 1}` : 'Blog';
    const topicSuffix =
      topic && topic.trim().length > 0 ? ` — ${topic}` : '';
    links.push({ label: `${label}${topicSuffix}`, url: blog.url });
  });

  if (week.devLogVideo) {
    week.devLogVideo.urls.forEach((url, index, urls) => {
      const label = urls.length > 1 ? `Dev Log #${index + 1}` : 'Dev Log';
      links.push({ label, url });
    });
  }

  if (Array.isArray(week.otherLinks)) {
    week.otherLinks.forEach(({ url, label }) => {
      links.push({ label, url });
    });
  }

  return links;
}

function renderWeekEntry(week) {
  const topics = getWeekTopics(week);
  const videos = getWeekVideos(week);
  const totalVideoTakes = videos.reduce(
    (total, video) => total + video.takes,
    0
  );
  const totalVideoKilometers = videos.reduce(
    (total, video) => total + video.kilometersRecorded,
    0
  );

  const lines = [];
  let heading = `### ${week.weekId}`;
  if (week.status !== 'skipped') {
    const topicsSummary = topics.length > 0 ? topics.join(' • ') : '—';
    heading += ` ${topicsSummary}`;
  }
  lines.push(heading);
  lines.push(
    `- Status: ${STATUS_LABELS[week.status]} ${statusToEmoji(week.status)}`
  );

  if (week.status === 'pending') {
    lines.push('- ⏳ Data is added every Saturday. Check back soon!');
    return lines.join('\n');
  }

  if (week.status !== 'skipped') {
    const hoursWorked = Math.round(week.minutesWorked / 60);
    lines.push(`- Time: ${hoursWorked}h`);
    lines.push(`- Video Takes: ${totalVideoTakes}`);
    lines.push(
      `- Travel Distance for Video Recording: ${totalVideoKilometers}km`
    );
  }

  const linkEntries = formatLinkEntries(week);
  if (linkEntries.length > 0) {
    lines.push('- Links:');
    linkEntries.forEach((link) => {
      lines.push(`  - ${link.label}: ${link.url}`);
    });
  }

  if (week.wins && week.wins.trim().length > 0) {
    lines.push('- Weekly win(s):');
    week.wins
      .trim()
      .split(/\r?\n/)
      .forEach((line) => {
        lines.push(`  > ${line}`);
      });
  }

  return lines.join('\n');
}

function renderWeeklyEntries(weeks, sortOrder) {
  const orderedWeeks =
    sortOrder === 'newest' ? [...weeks].reverse() : [...weeks];

  const lines = [];
  lines.push(`## Weekly Updates (${sortOrder === 'newest' ? 'Newest → Oldest' : 'Oldest → Newest'})`);
  lines.push('');
  orderedWeeks.forEach((week) => {
    lines.push(renderWeekEntry(week));
    lines.push('');
  });

  return lines.join('\n').trim();
}

function buildMarkdown(weeks) {
  const stats = getAggregatedStats(weeks);
  const yearGrid = buildYearGrid(weeks);
  const sortOrder = 'newest';

  const sections = [];

  sections.push('# Creator Dashboard #freewithtech');
  sections.push('');
  sections.push(
    'View this Creator Dashboard on GitHub: https://fwt.wtf/creator-dashboard'
  );
  sections.push('');
  sections.push(renderAggregatedStats(stats));
  sections.push(renderYearGridSection(yearGrid));
  sections.push('');
  sections.push(renderWeeklyEntries(weeks, sortOrder));

  return sections.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const weeks = loadWeeks();
  const markdown = buildMarkdown(weeks);
  fs.writeFileSync(OUTPUT_PATH, markdown, 'utf8');
  console.log(`llms.txt generated at ${OUTPUT_PATH}`);
}

main();
