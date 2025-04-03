import data from "@/data/weeks.json";
import { WeeklyEntry, WeekStatus } from "@/types";
import { statusToEmoji } from "@/lib/visuals";
import { getISOWeek, getISOWeekYear, isBefore, startOfWeek } from "date-fns";

const projectStartWeek = "2025-W04";

function generateAllWeekIds(year: number): string[] {
  return Array.from({ length: 52 }, (_, i) => `${year}-W${String(i + 1).padStart(2, "0")}`);
}

function getCurrentWeekId(): string {
  const now = new Date();
  return `${getISOWeekYear(now)}-W${String(getISOWeek(now)).padStart(2, "0")}`;
}

function simpleWeekStatus(
  weekId: string,
  currentWeekId: string,
  existingStatus?: WeekStatus
): WeekStatus | "pending" | "future" | "not_started" {
  if (existingStatus) return existingStatus;
  if (weekId > currentWeekId) return "future";
  if (weekId === currentWeekId) return "pending";
  if (weekId < projectStartWeek) return "not_started";
  return "skipped";
}

export function YearGrid() {
  const year = new Date().getFullYear();
  const currentWeekId = getCurrentWeekId();

  const weeksData = data as WeeklyEntry[];
  const weeksMap = new Map(weeksData.map((w) => [w.weekId, w]));

  const allWeeks = generateAllWeekIds(year);

  const mergedWeeks = allWeeks.map((weekId) => {
    const existing = weeksMap.get(weekId);
    const status = simpleWeekStatus(weekId, currentWeekId, existing?.weekStatus);

    return {
      weekId,
      topic: existing?.topic || "",
      content: existing?.content || {
        blogPublished: false,
        videoPublished: false,
        videoTakes: 0,
        publishedAt: {},
        links: {}
      },
      time: existing?.time || { minutesWorked: 0, daysWorked: 0 },
      expenses: existing?.expenses || [],
      notes: existing?.notes || "",
      weekStatus: status,
    };
  });

  return (
    <section className="mb-8 border rounded p-4">
      <h2 className="text-lg font-semibold mb-2">📅 Weekly Overview</h2>
      <div className="grid grid-cols-13 gap-1 text-sm">
        {mergedWeeks.map((week) => (
          <div
            key={week.weekId}
            title={`${week.weekId}${week.topic ? " — " + week.topic : ""}`}
            className={`w-6 h-6 flex items-center justify-center border rounded cursor-help ${week.weekStatus === "not_started" ? "text-gray-400" : ""
              }`}
          >
            {statusToEmoji(week.weekStatus)}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        ✅ Perfect &nbsp; ⚠️ Incomplete &nbsp; ❌ Skipped &nbsp; 🕒 Pending &nbsp; ◻️ Future &nbsp; ▫️ Not started
      </div>
    </section>
  );
}
