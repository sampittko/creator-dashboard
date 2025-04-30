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
      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
        <a href="https://fwt.wtf" target="_blank" className="group inline-block w-[421px] h-[69px] max-w-full" title="YouTube channel">
          <svg
            className="block group-hover:hidden w-full h-auto max-w-screen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 417 67"
          >
            <path
              fill="#DBF631"
              d="M411.15 18.6v-5.67h-11.34V7.26h-35.34v5.67h-61.03V7.26H268.1v5.67h-5.67v8.41a22.2 22.2 0 0 0-6.19-5.61c-2.79-1.7-5.89-2.74-9.24-3.11V1.27h-31.2v2.86h-15.12c-2.94-2.36-6.63-3.66-10.54-3.66-4.31 0-8.39 1.6-11.49 4.5-2.31 2.16-3.88 4.91-4.63 7.96h-47.81l1.28 9.09c-1.9-2.53-4.24-4.66-7-6.32-3.94-2.37-8.47-3.58-13.44-3.58s-9.37 1.12-13.31 3.34c-1.19.67-2.3 1.43-3.34 2.26-.9-.73-1.87-1.41-2.88-2.03-3.94-2.37-8.47-3.57-13.44-3.57-2.19 0-4.29.24-6.3.69h-14.5c-.74 0-1.47.04-2.19.11h-5.92V1.26H25.74c-5.08 0-9.59 1.82-13.03 5.26-1.84 1.84-3.22 4-4.1 6.4H.25v29.94h7.2v22.4h51.43v-3.78c.65.45 1.31.87 2.01 1.26 3.95 2.2 8.42 3.32 13.3 3.32 4.42 0 8.35-.82 11.67-2.45 1.76-.86 3.35-1.88 4.78-3.02 1.01.79 2.08 1.51 3.22 2.14 3.95 2.2 8.42 3.32 13.3 3.32 4.42 0 8.35-.82 11.67-2.45 3.12-1.53 5.75-3.5 7.82-5.89 1.34-1.54 2.43-3.03 3.32-4.52h1.92l1.7 12.06h72.14v-1.24c2.12.81 4.42 1.24 6.86 1.24h54.63v-5.67h6.54v5.67h143.05V18.57h-5.67z"
            />
            <path
              fill="#333"
              d="M285.77 47.61h-5.67V30.6h-5.67v-5.67h5.67v-5.67h11.34v5.67h11.34v5.67h-11.34v17.01h11.34v5.67h-17.01zm34.019-17.01v5.67h11.34V30.6h5.67v11.34h-17.01v5.67h17.01v5.67h-22.68v-5.67h-5.67V30.6h5.67v-5.67h17.01v5.67zm28.34 0v-5.67h22.68v5.67h-17.01v17.01h11.34v5.67h-17.01v-5.67h-5.67V30.6zm17.01 11.34h5.67v5.67h-5.67zm22.67 11.34h-11.34V19.27h11.34v5.67h11.34v5.67h5.67v22.68h-5.67V36.28h-5.67v-5.67h-5.67v22.68zm-368.349 0v-22.4h-7.2v-5.94h7.2v-5.26c0-1.94.58-3.5 1.74-4.66s2.68-1.74 4.54-1.74h7.43v5.94h-4.91c-1.07 0-1.6.57-1.6 1.71v4h7.43v5.94h-7.43v22.4h-7.2zm20.23 0V24.94h7.09v3.2h1.03c.42-1.14 1.11-1.98 2.08-2.51s2.1-.8 3.4-.8h3.43v6.4h-3.54c-1.83 0-3.33.49-4.51 1.46s-1.77 2.47-1.77 4.49v16.11h-7.2zm34.51.8c-2.82 0-5.3-.6-7.46-1.8s-3.83-2.89-5.03-5.09q-1.8-3.285-1.8-7.74v-.69q0-4.455 1.77-7.74c1.18-2.19 2.84-3.89 4.97-5.08 2.13-1.2 4.61-1.8 7.43-1.8s5.2.62 7.26 1.86 3.66 2.95 4.8 5.14 1.71 4.73 1.71 7.63v2.46H67.22c.08 1.94.8 3.52 2.17 4.74s3.05 1.83 5.03 1.83 3.5-.44 4.46-1.31c.95-.88 1.68-1.85 2.17-2.91l5.89 3.08c-.53.99-1.3 2.07-2.31 3.23s-2.35 2.15-4.03 2.97-3.81 1.23-6.4 1.23zm-6.91-18.23h13.26c-.15-1.64-.81-2.95-1.97-3.94s-2.68-1.49-4.54-1.49-3.49.5-4.63 1.49-1.85 2.31-2.11 3.94zm39.891 18.23c-2.82 0-5.31-.6-7.46-1.8s-3.83-2.89-5.03-5.09q-1.8-3.285-1.8-7.74v-.69q0-4.455 1.77-7.74c1.18-2.19 2.84-3.89 4.97-5.08 2.13-1.2 4.61-1.8 7.43-1.8s5.2.62 7.26 1.86 3.66 2.95 4.8 5.14 1.71 4.73 1.71 7.63v2.46h-20.63c.08 1.94.8 3.52 2.17 4.74s3.05 1.83 5.03 1.83 3.5-.44 4.46-1.31c.95-.88 1.68-1.85 2.17-2.91l5.89 3.08c-.53.99-1.31 2.07-2.31 3.23-1.01 1.16-2.35 2.15-4.03 2.97s-3.81 1.23-6.4 1.23zm-6.92-18.23h13.26c-.15-1.64-.81-2.95-1.97-3.94s-2.68-1.49-4.54-1.49-3.49.5-4.63 1.49-1.85 2.31-2.12 3.94m43.768 17.43-4-28.34h7.14l2.51 23.49h1.03l3.66-23.49h11.54l3.66 23.49h1.03l2.51-23.49h7.14l-4 28.34h-11.94l-3.66-23.49h-1.03l-3.66 23.49h-11.94zm46.121-31.66c-1.3 0-2.391-.42-3.291-1.26s-1.339-1.94-1.339-3.31.449-2.48 1.339-3.31c.89-.84 1.991-1.26 3.291-1.26s2.439.42 3.309 1.26c.88.84 1.311 1.94 1.311 3.31s-.441 2.48-1.311 3.31c-.88.84-1.979 1.26-3.309 1.26m-3.6 31.66V24.94h7.2v28.34zm26.05 0c-1.87 0-3.379-.58-4.539-1.74s-1.74-2.71-1.74-4.66v-16h-7.091v-5.94h7.091v-8.8h7.2v8.8h7.77v5.94h-7.77v14.74c0 1.14.529 1.71 1.599 1.71h5.49v5.94h-8zm15.201 0v-40h7.2v15.14h1.03c.3-.61.78-1.22 1.43-1.83s1.51-1.11 2.6-1.51q1.635-.6 4.14-.6c2.21 0 4.14.51 5.8 1.51 1.66 1.01 2.94 2.4 3.86 4.17s1.37 3.84 1.37 6.2v16.91h-7.2V36.93c0-2.13-.52-3.73-1.57-4.8s-2.54-1.6-4.49-1.6c-2.21 0-3.92.73-5.14 2.2s-1.83 3.51-1.83 6.14v14.4h-7.2z"
            />
          </svg>

          <svg
            className="hidden group-hover:block w-full h-auto max-w-screen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 421 69"
          >
            <path
              fill="#fff"
              d="M412.89 19.6v-5.67h-11.34V8.26h-35.34v5.67h-61.03V8.26h-35.34v5.67h-5.67v8.41a22.2 22.2 0 0 0-6.19-5.61c-2.79-1.7-5.89-2.74-9.24-3.11V2.27h-31.2v2.86h-15.12c-2.94-2.36-6.63-3.66-10.54-3.66-4.31 0-8.39 1.6-11.49 4.5-2.31 2.16-3.88 4.91-4.63 7.96h-47.81l1.28 9.09c-1.9-2.53-4.24-4.66-7-6.32-3.94-2.37-8.47-3.58-13.44-3.58s-9.37 1.12-13.31 3.34c-1.19.67-2.3 1.43-3.34 2.26-.9-.73-1.87-1.41-2.88-2.03-3.94-2.37-8.47-3.57-13.44-3.57-2.19 0-4.29.24-6.3.69h-14.5c-.74 0-1.47.04-2.19.11h-5.92V2.26H27.48c-5.08 0-9.59 1.82-13.03 5.26-1.84 1.84-3.22 4-4.1 6.4H1.99v29.94h7.2v22.4h51.43v-3.78c.65.45 1.31.87 2.01 1.26 3.95 2.2 8.42 3.32 13.3 3.32 4.42 0 8.35-.82 11.67-2.45 1.76-.86 3.35-1.88 4.78-3.02 1.01.79 2.08 1.51 3.22 2.14 3.95 2.2 8.42 3.32 13.3 3.32 4.42 0 8.35-.82 11.67-2.45 3.12-1.53 5.75-3.5 7.82-5.89 1.34-1.54 2.43-3.03 3.32-4.52h1.92l1.7 12.06h72.14v-1.24c2.12.81 4.42 1.24 6.86 1.24h54.63v-5.67h6.54v5.67h143.05V19.57h-5.67z"
            />
            <path
              fill="#333"
              d="M108.92 68.58c-5.14 0-9.86-1.18-14.03-3.51-.84-.47-1.67-1-2.48-1.58a27.6 27.6 0 0 1-4.13 2.49c-3.53 1.72-7.67 2.6-12.32 2.6-5.05 0-9.69-1.14-13.82-3.39v2.59H7.71v-22.4H.51V12.44h8.84c.96-2.22 2.32-4.23 4.05-5.96C17.13 2.75 22 .78 27.49.78h20.93v11.66h4.35c.74-.08 1.5-.11 2.27-.11h14.33c2.1-.46 4.28-.69 6.47-.69 5.25 0 10.03 1.27 14.21 3.79.72.44 1.43.91 2.12 1.42.85-.62 1.72-1.18 2.6-1.67 4.17-2.34 8.89-3.53 14.04-3.53s10.04 1.28 14.22 3.79c1.46.88 2.82 1.88 4.06 3.02l-.85-6.01h48.4c.92-2.9 2.54-5.49 4.74-7.55C182.76 1.74 187.2 0 191.9 0c4.01 0 7.92 1.29 11.05 3.66h13.11V.8h34.2v11.54a23.692 23.692 0 0 1 12.43 6.11v-6h5.67V6.78h38.34v5.67h58.03V6.78h38.34v5.67h11.34v5.67h5.67V67.8H274.03v-5.67h-3.54v5.67h-56.13c-1.85 0-3.64-.23-5.36-.68v.68h-74.94l-1.66-11.78c-.8 1.23-1.74 2.46-2.84 3.73-2.2 2.53-4.99 4.64-8.3 6.25-3.53 1.72-7.67 2.6-12.32 2.6zM92.38 59.7l.93.73c.98.76 2 1.44 3.03 2.02 3.72 2.08 7.95 3.13 12.57 3.13 4.19 0 7.89-.77 11.01-2.29 2.94-1.44 5.41-3.29 7.35-5.52 1.29-1.48 2.32-2.89 3.16-4.31l.44-.73h4.08l1.7 12.06h69.34v-1.93l2.04.78c1.97.76 4.1 1.14 6.32 1.14h53.13v-5.67h9.54v5.67h140.05V21.1h-5.67v-5.67h-11.34V9.76h-32.34v5.67h-64.03V9.76h-32.34v5.67h-5.67v11.39l-2.7-3.58c-1.58-2.1-3.53-3.86-5.77-5.23-2.6-1.58-5.5-2.56-8.62-2.9l-1.34-.15V3.76h-28.2v2.86H201.9l-.41-.33c-2.71-2.18-6.03-3.33-9.6-3.33-3.93 0-7.64 1.45-10.47 4.09a14.55 14.55 0 0 0-4.19 7.22l-.28 1.14h-47.26l1.86 13.15-3.5-4.65c-1.8-2.4-4.01-4.39-6.57-5.93-3.71-2.23-7.97-3.36-12.67-3.36s-8.86 1.06-12.57 3.15c-1.07.6-2.12 1.31-3.14 2.12l-.94.75-.94-.76c-.86-.7-1.77-1.34-2.71-1.91-3.71-2.23-7.97-3.36-12.67-3.36-2.03 0-4.04.22-5.98.65l-.33.04h-14.5c-.69 0-1.37.04-2.03.11h-7.58V3.75H27.49c-4.68 0-8.82 1.67-11.97 4.82a16 16 0 0 0-3.75 5.86l-.36.98h-7.9v26.94h7.2v22.4h48.43v-5.13l2.35 1.61c.71.49 1.31.87 1.9 1.19 3.72 2.08 7.95 3.13 12.57 3.13 4.19 0 7.89-.77 11.01-2.29 1.59-.78 3.11-1.73 4.51-2.85l.92-.73z"
            />
            <path
              fill="#333"
              d="M287.51 48.61h-5.67V31.6h-5.67v-5.67h5.67v-5.67h11.34v5.67h11.34v5.67h-11.34v17.01h11.34v5.67h-17.01zm34.019-17.01v5.67h11.34V31.6h5.67v11.34h-17.01v5.67h17.01v5.67h-22.68v-5.67h-5.67V31.6h5.67v-5.67h17.01v5.67zm28.34 0v-5.67h22.68v5.67h-17.01v17.01h11.34v5.67h-17.01v-5.67h-5.67V31.6zm17.01 11.34h5.67v5.67h-5.67zm22.672 11.34h-11.34V20.27h11.34v5.67h11.34v5.67h5.67v22.68h-5.67V37.28h-5.67v-5.67h-5.67v22.68zm-368.351 0v-22.4H14v-5.94h7.2v-5.26c0-1.94.58-3.5 1.74-4.66s2.68-1.74 4.54-1.74h7.43v5.94H30c-1.07 0-1.6.57-1.6 1.71v4h7.43v5.94H28.4v22.4h-7.2zm20.23 0V25.94h7.09v3.2h1.03c.42-1.14 1.11-1.98 2.08-2.51s2.1-.8 3.4-.8h3.43v6.4h-3.54c-1.83 0-3.33.49-4.51 1.46s-1.77 2.47-1.77 4.49v16.11h-7.2zm34.51.8c-2.82 0-5.3-.6-7.46-1.8s-3.83-2.89-5.03-5.09q-1.8-3.285-1.8-7.74v-.69q0-4.455 1.77-7.74c1.18-2.19 2.84-3.89 4.97-5.08 2.13-1.2 4.61-1.8 7.43-1.8s5.2.62 7.26 1.86 3.66 2.95 4.8 5.14 1.71 4.73 1.71 7.63v2.46H68.96c.08 1.94.8 3.52 2.17 4.74s3.05 1.83 5.03 1.83 3.5-.44 4.46-1.31c.95-.88 1.68-1.85 2.17-2.91l5.89 3.08c-.53.99-1.3 2.07-2.31 3.23s-2.35 2.15-4.03 2.97-3.81 1.23-6.4 1.23zm-6.91-18.23h13.26c-.15-1.64-.81-2.95-1.97-3.94s-2.68-1.49-4.54-1.49-3.49.5-4.63 1.49-1.85 2.31-2.11 3.94zm39.879 18.23c-2.82 0-5.31-.6-7.46-1.8s-3.83-2.89-5.03-5.09q-1.8-3.285-1.8-7.74v-.69q0-4.455 1.77-7.74c1.18-2.19 2.84-3.89 4.97-5.08 2.13-1.2 4.61-1.8 7.43-1.8s5.2.62 7.26 1.86 3.66 2.95 4.8 5.14 1.71 4.73 1.71 7.63v2.46h-20.63c.08 1.94.8 3.52 2.17 4.74s3.05 1.83 5.03 1.83 3.5-.44 4.46-1.31c.95-.88 1.68-1.85 2.17-2.91l5.89 3.08c-.53.99-1.31 2.07-2.31 3.23-1.01 1.16-2.35 2.15-4.03 2.97s-3.81 1.23-6.4 1.23zm-6.91-18.23h13.26c-.15-1.64-.81-2.95-1.97-3.94s-2.68-1.49-4.54-1.49-3.49.5-4.63 1.49-1.85 2.31-2.12 3.94m43.771 17.43-4-28.34h7.14l2.51 23.49h1.03l3.66-23.49h11.54l3.66 23.49h1.03l2.51-23.49h7.14l-4 28.34h-11.94l-3.66-23.49h-1.03l-3.66 23.49h-11.94zm46.12-31.66c-1.3 0-2.39-.42-3.29-1.26s-1.34-1.94-1.34-3.31.45-2.48 1.34-3.31c.89-.84 1.99-1.26 3.29-1.26s2.44.42 3.31 1.26c.88.84 1.31 1.94 1.31 3.31s-.44 2.48-1.31 3.31c-.88.84-1.98 1.26-3.31 1.26m-3.6 31.66V25.94h7.2v28.34zm26.051 0c-1.87 0-3.38-.58-4.54-1.74s-1.74-2.71-1.74-4.66v-16h-7.09v-5.94h7.09v-8.8h7.2v8.8h7.77v5.94h-7.77v14.74c0 1.14.53 1.71 1.6 1.71h5.49v5.94h-8zm15.198 0v-40h7.2v15.14h1.03c.3-.61.78-1.22 1.43-1.83s1.51-1.11 2.6-1.51q1.635-.6 4.14-.6c2.21 0 4.14.51 5.8 1.51 1.66 1.01 2.94 2.4 3.86 4.17s1.37 3.84 1.37 6.2v16.91h-7.2V37.93c0-2.13-.52-3.73-1.57-4.8s-2.54-1.6-4.49-1.6c-2.21 0-3.92.73-5.14 2.2s-1.83 3.51-1.83 6.14v14.4h-7.2z"
            />
          </svg>
        </a>

        <span>
          View the project on{" "}
          <a
            href="https://github.com/sampittko/dash-fwtwtf-website"
            target="_blank"
            className="text-blue-600 underline hover:no-underline"
          >
            GitHub
          </a>
        </span>
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
            📅 Total Days Worked: {stats.totalDaysWorked} (1 hour or more counts as a day worked)
            <span className="text-gray-500 dark:text-gray-400"> (avg {stats.averages.daysWorked}/week)</span>
          </li>
          <li>
            🎬 Total Video Takes: {stats.totalVideoTakes}
            <span className="text-gray-500 dark:text-gray-400"> (avg {stats.averages.videoTakes}/week in {stats.videoWeeks} video weeks)</span>  <i>&ldquo;Bring value. Next action. Repeat.&rdquo;</i>
          </li>
          <li>
            🚗 Total Travel Distance for Video Recording: {stats.totalVideoKilometersTraveled}km
            <span className="text-gray-500 dark:text-gray-400"> (avg {stats.averages.videoKilometersTraveled}km/week in {stats.videoWeeks} video weeks)</span>
          </li>
          <li>
            💸 Total Expenses: €{stats.totalExpenses.all.toFixed(2)}
            <span className="text-gray-500 dark:text-gray-400"> (avg €{stats.averages.expenses}/week)</span> <i>&ldquo;Put your money where your mouth is.&rdquo;</i>
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
          <li>🏆 Longest Streak: {stats.streaks?.longest ?? 0}  <i>&ldquo;Don&apos;t break the chain.&rdquo;</i></li>
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
                  <span className="font-medium">Time:</span> {Math.round(week.time.minutesWorked / 60)}h over {week.time.daysWorked} day(s) (1 hour or more counts as a day worked)
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
        <a
          href="https://www.buymeacoffee.com/sampittko"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-1 px-3 rounded shadow whitespace-nowrap"
        >
          ☕ Buy Me a Coffee
        </a>
      </footer>
    </main>
  );
}
