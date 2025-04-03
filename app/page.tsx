import data from "@/data/weeks.json";
import { WeeklyEntry } from "@/types";
import { getAggregatedStats } from "@/lib/stats";

export const metadata = {
  title: "Free With Tech – Weekly Creator Dashboard",
  description:
    "A transparent look behind the scenes of the Free With Tech project. Follow weekly progress, content publishing, time invested, and resources spent on building a public brand from scratch.",
};

export default function DashboardPage() {
  const weeks = [...(data as WeeklyEntry[])].reverse();
  const stats = getAggregatedStats();

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-6">Free With Tech: Weekly Dashboard</h1>

      {/* Aggregated Stats */}
      <section className="mb-8 border rounded p-4">
        <h2 className="text-lg font-semibold mb-2">📊 Aggregated Stats</h2>
        <ul className="text-sm space-y-1">
          <li>🕒 Total Minutes Worked: {stats.totalMinutesWorked}</li>
          <li>📅 Total Days Worked: {stats.totalDaysWorked}</li>
          <li>🎬 Total Video Takes: {stats.totalVideoTakes}</li>
          <li>💸 Total Expenses: €{stats.totalExpenses.all.toFixed(2)}</li>
          <li>📝 Blogs Published: {stats.totalContent.blogCount}</li>
          <li>📹 Videos Published: {stats.totalContent.videoCount}</li>
          <li>🔥 Perfect Weeks: {stats.totalContent.perfectWeeks}</li>
          <li>⚡ Current Streak: {stats.streaks?.current ?? 0}</li>
          <li>🏆 Longest Streak: {stats.streaks?.longest ?? 0}</li>
        </ul>
      </section>

      {/* Weekly Breakdown */}
      <div className="grid gap-4">
        {weeks.map((week) => (
          <div key={week.weekId} className="border rounded p-4">
            <div className="text-sm text-gray-500">{week.weekId}</div>
            <div className="font-semibold">{week.weekStatus === "not_started"
              ? "—"
              : week.weekStatus === "skipped"
                ? "Skipped week"
                : week.topic}</div>

            <div className="text-sm mt-1">
              <span className="font-medium">Status:</span> {week.weekStatus}
            </div>

            <div className="text-sm mt-1">
              <span className="font-medium">Time:</span> {week.time.minutesWorked} min over {week.time.daysWorked} day(s)
            </div>

            <div className="text-sm mt-1">
              <span className="font-medium">Video Takes:</span> {week.content.videoTakes}
            </div>

            <div className="text-sm mt-2">
              {week.content.blogPublished && (
                <a
                  href={week.content.links?.blogUrl}
                  target="_blank"
                  className="text-blue-600 underline mr-2"
                >
                  Blog
                </a>
              )}
              {week.content.videoPublished && (
                <a
                  href={week.content.links?.videoUrl}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Video
                </a>
              )}
            </div>

            {/* Expenses */}
            {week.expenses.length > 0 && (
              <div className="mt-2 text-sm">
                <div className="font-medium">Expenses:</div>
                <ul className="ml-4 list-disc">
                  {week.expenses.map((exp, i) => (
                    <li key={i}>
                      {exp.label} — €{exp.amountEUR.toFixed(2)}{" "}
                      <span className="text-gray-500">({exp.type})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes */}
            <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
              {week.notes || "No notes for this week."}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
