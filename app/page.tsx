import data from "@/data/weeks.json";
import { WeeklyEntry } from "@/types";
import { getAggregatedStats } from "@/lib/stats";
import { YearGrid } from "./components/year-grid";

export const metadata = {
  title: "Free With Tech – Creator Dashboard",
  description:
    "A transparent look behind the scenes of the Free With Tech project. Follow weekly progress, content publishing, time invested, and resources spent on building a public brand from scratch.",
  openGraph: {
    type: "website",
    url: "https://dash.fwt.wtf",
    title: "Free With Tech – Creator Dashboard",
    description:
      "A transparent look behind the scenes of the Free With Tech project. Follow weekly progress, content publishing, time invested, and resources spent on building a public brand from scratch.",
    images: [
      {
        url: "https://dash.fwt.wtf/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free With Tech – Creator Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free With Tech – Creator Dashboard",
    description:
      "A transparent look behind the scenes of the Free With Tech project. Follow weekly progress, content publishing, time invested, and resources spent on building a public brand from scratch.",
    images: ["https://dash.fwt.wtf/assets/og-image.png"],
  },
};

export default function DashboardPage() {
  const weeks = [...(data as WeeklyEntry[])].reverse();
  const stats = getAggregatedStats();

  return (
    <main className="p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
        <h1 className="text-xl font-bold"><a href="https://fwt.wtf/sign" target="_blank" className="underline hover:no-underline">Free With Tech</a> - Creator Dashboard</h1>
        <a
          href="https://www.buymeacoffee.com/sampittko"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-1 px-3 rounded shadow whitespace-nowrap"
        >
          ☕ Buy Me a Coffee
        </a>
      </div>

      <section className="mb-8 border rounded p-4">
        <h2 className="text-lg font-semibold mb-2">📊 Aggregated Stats</h2>
        <ul className="text-sm space-y-1">
          <li>📆 Total Project Weeks: {stats.totalProjectWeeks}</li>
          <li>
            🕒 Total Hours Worked: {stats.totalHoursWorked}h
            <span className="text-gray-500 dark:text-gray-400"> (avg {stats.averages.hoursWorked}h/week)</span>
          </li>
          <li>
            📅 Total Days Worked: {stats.totalDaysWorked}
            <span className="text-gray-500 dark:text-gray-400"> (avg {stats.averages.daysWorked}/week)</span>
          </li>
          <li>
            🎬 Total Video Takes: {stats.totalVideoTakes}
            <span className="text-gray-500 dark:text-gray-400"> (avg {stats.averages.videoTakes}/week in {stats.videoWeeks} video weeks)</span>
          </li>
          <li>
            🚗 Total Travel Distance for Video Recording: {stats.totalVideoKilometersTraveled}
            <span className="text-gray-500 dark:text-gray-400"> (avg {stats.averages.videoKilometersTraveled}km/week in {stats.videoWeeks} video weeks)</span>
          </li>
          <li>
            💸 Total Expenses: €{stats.totalExpenses.all.toFixed(2)}
            <span className="text-gray-500 dark:text-gray-400"> (avg €{stats.averages.expenses}/week)</span>
          </li>
          <li>
            📝 Blogs Published: {stats.totalContent.blogCount}
            <span className="text-gray-500 dark:text-gray-400"> (avg {stats.averages.blogs}/week in {stats.blogWeeks} blog weeks)</span>
          </li>
          <li>
            📹 Videos Published: {stats.totalContent.videoCount}
            <span className="text-gray-500 dark:text-gray-400"> (avg {stats.averages.videos}/week in {stats.videoWeeks} video weeks)</span>
          </li>
          <li>🔥 Perfect Weeks: {stats.totalContent.perfectWeeks}</li>
          <li>⚡ Current Streak: {stats.streaks?.current ?? 0}</li>
          <li>🏆 Longest Streak: {stats.streaks?.longest ?? 0}</li>
        </ul>
      </section>

      <YearGrid />

      <div className="grid gap-4 mb-4">
        {weeks.map((week) => (
          <div key={week.weekId} className="border rounded p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">{week.weekId}</div>
            <div className="font-semibold">
              {week.topic || "—"}
            </div>

            {week.weekStatus === "pending" ? (
              <div className="mt-2 text-sm text-blue-700 bg-blue-100 border border-blue-300 rounded p-2">
                ⏳ Data is added every Saturday. Check back soon!
              </div>
            ) : (
              <>
                <div className="text-sm mt-1">
                  <span className="font-medium">Status:</span> {week.weekStatus}
                </div>

                <div className="text-sm mt-1">
                  <span className="font-medium">Time:</span> {Math.round(week.time.minutesWorked / 60)}h over {week.time.daysWorked} day(s)
                </div>

                <div className="text-sm mt-1">
                  <span className="font-medium">Video Takes:</span> {week.content.videoTakes}
                </div>

                <div className="text-sm mt-1">
                  <span className="font-medium">Travel Distance for Video Recording:</span> {week.content.videoKilometersTraveled}km
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

                {week.expenses.length > 0 && (
                  <div className="mt-2 text-sm">
                    <div className="font-medium">Expenses:</div>
                    <ul className="ml-4 list-disc">
                      {week.expenses.map((exp, i) => (
                        <li key={i}>
                          {exp.label} — €{exp.amountEUR.toFixed(2)} <span className="text-gray-500 dark:text-gray-400">({exp.type})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
                  {week.notes || "No notes for this week."}
                </div>
              </>
            )}
          </div>

        ))}
      </div>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
        View the project on{" "}
        <a
          href="https://github.com/sampittko/dash-fwtwtf-website"
          target="_blank"
          className="text-blue-600 underline"
        >
          GitHub
        </a>
        .
      </footer>
    </main>
  );
}
