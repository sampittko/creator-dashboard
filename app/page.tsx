import Link from "next/link";

import data from "@/data/weeks.json";
import { WeeklyEntry } from "@/types";
import { getAggregatedStats } from "@/lib/stats";
import { YearGrid } from "./components/year-grid";
import { ScrollToTop } from "./components/scroll-to-top";

export const metadata = {
  title: "Creator Dashboard #freewithtech",
  description:
    "A transparent look behind the scenes of the #freewithtech project. Follow weekly progress, content publishing, time invested, and resources spent on building a public brand from scratch.",
  openGraph: {
    type: "website",
    url: "https://journey.freewith.tech",
    title: "Creator Dashboard #freewithtech",
    description:
      "A transparent look behind the scenes of the #freewithtech project. Follow weekly progress, content publishing, time invested, and resources spent on building a public brand from scratch.",
    images: [
      {
        url: "https://journey.freewith.tech/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creator Dashboard #freewithtech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Dashboard #freewithtech",
    description:
      "A transparent look behind the scenes of the #freewithtech project. Follow weekly progress, content publishing, time invested, and resources spent on building a public brand from scratch.",
    images: ["https://journey.freewith.tech/assets/og-image.png"],
  },
};

type DashboardPageProps = {
  searchParams?: Promise<{
    sort?: string | string[];
  }>;
};

const STATUS_LABELS: Record<WeeklyEntry["status"], string> = {
  not_started: "Not Started ⚪️",
  future: "Future ⚪️",
  pending: "Pending 🟠",
  perfect: "Perfect 🟢",
  incomplete: "Incomplete 🔴",
  skipped: "Skipped 🔴",
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const rawWeeks = data as WeeklyEntry[];
  const resolvedSearchParams = (await searchParams) ?? {};
  const sortQuery = Array.isArray(resolvedSearchParams.sort)
    ? resolvedSearchParams.sort[0]
    : resolvedSearchParams.sort;
  const sortOrder = sortQuery === "oldest" ? "oldest" : "newest";
  const weeks =
    sortOrder === "newest" ? [...rawWeeks].reverse() : [...rawWeeks];
  const stats = getAggregatedStats();

  return (
    <main id="top" className="p-4">
      <div className="flex flex-col items-center gap-1 mb-6">
        <a
          href="https://fwt.wtf"
          target="_blank"
          title="YouTube channel"
          className="group max-w-[490px] w-full h-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490 116"
            fill="none"
          >
            <path
              fill="#fff"
              d="M482.285 43.39v-5.67h-11.34v-5.67h-35.34v5.67h-61.03v-5.67h-35.34v5.67h-5.67v8.41a22.157 22.157 0 0 0-6.19-5.61c-2.79-1.7-5.89-2.74-9.24-3.11V26.06h-31.2v2.86h-15.12c-2.94-2.36-6.63-3.66-10.54-3.66-4.31 0-8.39 1.6-11.49 4.5-2.31 2.16-3.88 4.91-4.63 7.96h-47.81l1.28 9.09c-1.9-2.53-4.24-4.66-7-6.32-3.94-2.37-8.47-3.58-13.44-3.58-4.97 0-9.37 1.12-13.31 3.34-1.19.67-2.3 1.43-3.34 2.26-.9-.73-1.87-1.41-2.88-2.03-3.94-2.37-8.47-3.57-13.44-3.57-2.19 0-4.29.24-6.3.69h-14.5c-.74 0-1.47.04-2.19.11h-5.92V26.05h-19.43c-5.08 0-9.59 1.82-13.03 5.26-1.84 1.84-3.22 4-4.1 6.4h-19.96v29.94h7.2v22.4h63.03v-3.78c.65.45 1.31.87 2.01 1.26 3.95 2.2 8.42 3.32 13.3 3.32 4.42 0 8.35-.82 11.67-2.45 1.76-.86 3.35-1.88 4.78-3.02 1.01.79 2.08 1.51 3.22 2.14 3.95 2.2 8.42 3.32 13.3 3.32 4.42 0 8.35-.82 11.67-2.45 3.12-1.53 5.75-3.5 7.82-5.89 1.34-1.54 2.43-3.03 3.32-4.52h1.92l1.7 12.06h72.14V88.8c2.12.81 4.42 1.24 6.86 1.24h54.63v-5.67h6.54v5.67h143.05V43.36h-5.67l.01.03Z"
            />
            <path
              fill="#333"
              d="M178.305 92.369c-5.14 0-9.86-1.18-14.03-3.51-.84-.47-1.67-1-2.48-1.58-1.3.95-2.69 1.78-4.13 2.49-3.53 1.72-7.67 2.6-12.32 2.6-5.05 0-9.69-1.14-13.82-3.39v2.59h-66.03v-22.4h-7.2V36.23h20.45c.96-2.22 2.32-4.23 4.05-5.96 3.73-3.73 8.6-5.7 14.09-5.7h20.93v11.66h4.35c.74-.08 1.5-.11 2.27-.11h14.33c2.1-.46 4.28-.69 6.47-.69 5.25 0 10.03 1.27 14.21 3.79.73.44 1.44.91 2.12 1.42.85-.62 1.72-1.18 2.6-1.67 4.17-2.34 8.89-3.53 14.04-3.53 5.15 0 10.04 1.27 14.22 3.79 1.46.88 2.82 1.88 4.06 3.01l-.85-6h48.4c.92-2.9 2.54-5.49 4.74-7.55 3.38-3.16 7.82-4.9 12.52-4.9 4.01 0 7.92 1.3 11.05 3.66h13.11v-2.86h34.2v11.54a23.692 23.692 0 0 1 12.43 6.11v-6h5.67v-5.67h38.34v5.67h58.03v-5.67h38.34v5.67h11.34v5.67h5.67v49.68h-146.05v-5.67h-3.54v5.67h-56.13c-1.84 0-3.64-.23-5.36-.68v.68h-74.94l-1.66-11.78c-.8 1.23-1.74 2.46-2.84 3.73-2.2 2.53-4.99 4.64-8.3 6.25-3.53 1.72-7.67 2.6-12.32 2.6l-.03-.02Zm-16.53-8.88.93.73c.97.76 1.99 1.44 3.03 2.02 3.72 2.08 7.95 3.13 12.57 3.13 4.19 0 7.89-.77 11.01-2.29 2.94-1.44 5.41-3.29 7.35-5.52 1.29-1.48 2.32-2.89 3.16-4.31l.44-.73h4.08l1.7 12.06h69.34v-1.93l2.04.78c1.97.76 4.1 1.14 6.32 1.14h53.13V82.9h9.54v5.67h140.05V44.89h-5.67v-5.67h-11.34v-5.67h-32.34v5.67h-64.03v-5.67h-32.34v5.67h-5.67v11.39l-2.7-3.58c-1.58-2.1-3.53-3.86-5.77-5.23-2.6-1.58-5.5-2.56-8.62-2.9l-1.34-.15v-11.2h-28.2v2.86h-17.15l-.41-.33c-2.71-2.18-6.03-3.33-9.6-3.33-3.93 0-7.64 1.45-10.46 4.09-2.06 1.93-3.51 4.42-4.2 7.22l-.28 1.14h-47.26l1.86 13.15-3.5-4.66c-1.8-2.4-4.01-4.39-6.57-5.93-3.71-2.23-7.97-3.36-12.67-3.36s-8.86 1.06-12.57 3.15c-1.07.6-2.12 1.31-3.14 2.12l-.94.75-.94-.76c-.86-.7-1.77-1.34-2.71-1.9-3.71-2.23-7.97-3.36-12.67-3.36-2.03 0-4.04.22-5.98.65l-.33.04h-14.5c-.69 0-1.37.04-2.03.11h-7.58V27.54h-17.93c-4.68 0-8.82 1.67-11.97 4.82a16.032 16.032 0 0 0-3.75 5.86l-.36.98h-19.51v26.94h7.2v22.4h60.03v-5.13l2.35 1.61c.71.49 1.31.87 1.9 1.19 3.72 2.08 7.95 3.13 12.57 3.13 4.19 0 7.89-.77 11.01-2.29 1.59-.78 3.11-1.74 4.51-2.85l.92-.73-.01.02Z"
            />
            <path
              fill="#333"
              d="M356.905 72.399h-5.671v-17.01h-5.67v-5.67h5.67v-5.67h11.34v5.67h11.341v5.67h-11.341v17.01h11.341v5.67h-17.01v-5.67ZM390.914 55.389v5.67h11.34v-5.67h5.67v11.34h-17.01v5.67h17.01v5.67h-22.68v-5.67h-5.67v-17.01h5.67v-5.67h17.01v5.67h-11.34ZM419.266 55.389v-5.67h22.68v5.67h-17.01v17.01h11.34v5.67h-17.01v-5.67h-5.67v-17.01h5.67Zm17.01 11.34h5.67v5.67h-5.67v-5.67ZM458.946 78.069h-11.341v-34.01h11.341v5.67h11.339v5.67h5.671v22.68h-5.671v-17.01h-5.67v-5.67h-5.669v22.68-.01ZM90.594 78.069v-22.4h-7.2v-5.94h7.2v-5.26c0-1.94.58-3.5 1.74-4.66 1.16-1.16 2.68-1.74 4.54-1.74h7.43v5.94h-4.91c-1.07 0-1.6.57-1.6 1.71v4h7.431v5.94h-7.43v22.4h-7.2v.01ZM110.814 78.069v-28.34h7.091v3.2h1.03c.42-1.14 1.109-1.98 2.079-2.51.97-.53 2.101-.8 3.401-.8h3.429v6.4h-3.54c-1.83 0-3.33.49-4.51 1.46-1.18.97-1.77 2.47-1.77 4.49v16.11h-7.2l-.01-.01ZM145.335 78.869c-2.82 0-5.3-.6-7.46-1.8-2.16-1.2-3.83-2.89-5.03-5.09-1.2-2.19-1.8-4.77-1.8-7.74v-.69c0-2.97.59-5.55 1.77-7.74 1.18-2.19 2.84-3.89 4.97-5.08 2.13-1.2 4.61-1.8 7.43-1.8 2.82 0 5.2.62 7.26 1.86 2.06 1.24 3.66 2.95 4.8 5.14 1.14 2.19 1.71 4.73 1.71 7.63v2.46h-20.63c.08 1.94.8 3.52 2.17 4.74 1.37 1.22 3.05 1.83 5.03 1.83 1.98 0 3.5-.44 4.46-1.31.95-.88 1.68-1.85 2.17-2.91l5.89 3.08c-.53.99-1.3 2.07-2.31 3.23-1.01 1.16-2.35 2.15-4.03 2.97-1.68.82-3.81 1.23-6.4 1.23v-.01Zm-6.91-18.23h13.26c-.15-1.64-.81-2.95-1.97-3.94-1.16-.99-2.68-1.49-4.54-1.49-1.86 0-3.49.5-4.63 1.49-1.14.99-1.85 2.31-2.11 3.94h-.01ZM178.306 78.869c-2.82 0-5.31-.6-7.46-1.8-2.15-1.2-3.83-2.89-5.03-5.09-1.2-2.19-1.8-4.77-1.8-7.74v-.69c0-2.97.59-5.55 1.77-7.74 1.18-2.19 2.84-3.89 4.97-5.08 2.13-1.2 4.61-1.8 7.43-1.8 2.82 0 5.2.62 7.26 1.86 2.06 1.24 3.66 2.95 4.8 5.14 1.14 2.19 1.71 4.73 1.71 7.63v2.46h-20.63c.08 1.94.8 3.52 2.17 4.74 1.37 1.22 3.05 1.83 5.03 1.83 1.98 0 3.5-.44 4.46-1.31.95-.88 1.68-1.85 2.17-2.91l5.89 3.08c-.53.99-1.31 2.07-2.31 3.23-1.01 1.16-2.35 2.15-4.03 2.97-1.68.82-3.81 1.23-6.4 1.23v-.01Zm-6.91-18.23h13.26c-.15-1.64-.81-2.95-1.97-3.94-1.16-.99-2.68-1.49-4.54-1.49-1.86 0-3.49.5-4.63 1.49-1.14.99-1.85 2.31-2.12 3.94ZM215.166 78.069l-4-28.34h7.14l2.51 23.49h1.03l3.66-23.49h11.54l3.66 23.49h1.03l2.51-23.49h7.14l-4 28.34h-11.94l-3.66-23.49h-1.03l-3.66 23.49h-11.94.01ZM261.286 46.409c-1.3 0-2.39-.42-3.29-1.26-.9-.84-1.34-1.94-1.34-3.31s.45-2.48 1.34-3.31c.89-.84 1.99-1.26 3.29-1.26s2.44.42 3.31 1.26c.88.84 1.31 1.94 1.31 3.31s-.44 2.48-1.31 3.31c-.88.84-1.98 1.26-3.31 1.26Zm-3.61 31.66v-28.34h7.2v28.34h-7.2ZM283.735 78.069c-1.87 0-3.38-.58-4.54-1.74-1.16-1.16-1.74-2.71-1.74-4.66v-16h-7.09v-5.94h7.09v-8.8h7.2v8.8h7.77v5.94h-7.77v14.74c0 1.14.53 1.71 1.6 1.71h5.49v5.94h-8l-.01.01ZM298.936 78.069v-40h7.199v15.14h1.031c.3-.61.779-1.22 1.429-1.83.65-.61 1.511-1.11 2.601-1.51 1.09-.4 2.469-.6 4.139-.6 2.21 0 4.14.51 5.8 1.51 1.66 1.01 2.94 2.4 3.86 4.17.92 1.77 1.37 3.84 1.37 6.2v16.91h-7.199v-16.34c0-2.13-.521-3.73-1.571-4.8-1.05-1.07-2.54-1.6-4.49-1.6-2.21 0-3.919.73-5.139 2.2-1.22 1.47-1.831 3.51-1.831 6.14v14.4h-7.199v.01Z"
            />
            <path
              className="fill-[#DBF631] group-hover:fill-[#CEBAF4]"
              d="M76.305 58.369c-.64-1.92-1.48-3.95-3.2-5.74-.41-.42-.85-.82-1.33-1.18 0-1.1 0-2.08-.03-2.87-.35-14.13-3.12-27.97-8.25-41.15-2.59-6.66-7.43-7.28-9.39-7.23-.58.01-1.16.08-1.72.21-1.96.43-4.72 1.77-6.78 5.67-3.33 6.32-4.84 13.71-4.74 23.28.04 3.39.26 6.73.47 9.97l.15 2.27c-.45-.48-.89-.97-1.33-1.46l-21.99-24.33c-.93-1.03-2.49-2.75-4.96-3.75-1.8-.72-3.84-.89-5.74-.47-2.27.5-4.14 1.76-5.41 3.63-1.32 1.95-1.8 4.33-1.41 7.07.61 4.34 2.44 8.04 4.33 11.39 4.58 8.13 10.16 15.57 15.72 22.46-.82.28-1.6.64-2.33 1.06-4.02 2.28-6.85 6.45-7.76 11.46-.5 2.75-.43 5.72.21 9.06-2.91 4-3.63 9.63-1.9 15.36 1.72 5.71 5.3 10.82 10.1 14.37 5.64 4.17 12.08 5.78 18.74 7.19 3.48.74 6.64 1.34 10.16 1.31 1.85-.02 3.73-.23 5.58-.64 10.53-2.32 19.89-10.93 23.84-21.93 3.63-10.09 3.28-22.19-1.01-35l-.02-.01Z"
            />
            <path
              fill="#333"
              d="M32.916 59.599c-5.38-7.19-11.25-14-16.32-21.43-2.51-3.68-4.96-7.5-6.94-11.51-.82-1.66-3.33-6.38 0-6.79 2.23-.28 3.78 2.34 5 3.78 5.93 7 12.2 13.73 18.34 20.54 2.55 2.83 5.02 5.85 8.02 8.21 1.68 1.32 6.29 4.84 7.85 1.77.72-1.41.53-3.27.5-4.78-.05-2.33-.19-4.66-.33-6.98-.29-4.54-.67-9.09-.61-13.65.05-4.04.47-8.13 1.62-12.02.62-2.1 3.73-11.18 6.63-6.23 1.03 1.75 1.55 4.04 2.18 5.96.74 2.26 1.41 4.54 1.99 6.85 1.15 4.52 2 9.11 2.55 13.74.98 8.17 2.12 18.03-1.85 25.61-3.51 6.71-11.69 10.07-18.56 6.07-1.12-.65-3.38-2.12-3.31-3.51.09-1.76 2.12-3.11 3.5-3.8 3.41-1.71 7.51-2.53 11.24-3.21 3.81-.7 8.7-1.43 12.38.18 2.01.87 2.54 2.64 3.14 4.59.61 1.98 1.12 3.99 1.49 6.03 1.44 7.86.98 16.44-2.78 23.62-3.32 6.33-9.05 11.62-16.04 13.52-3.76 1.02-7.54.77-11.34.09-4.04-.72-8.14-1.56-12-2.96-3.76-1.37-7.29-3.44-9.9-6.52-2.54-3-4.73-7.06-3.49-11.07 1.18-3.83 5.26-5.32 8.94-4.5 3.98.89 7.15 4.22 9.47 7.39 1.23 1.69 2.56 3.72 2.78 5.85.24 2.37-1.11 3.78-3.48 3.45-4.08-.55-7.14-4.29-9.33-7.42-4.22-6.03-9.93-17.34-3.62-23.82 3.02-3.1 7.78-2.65 11.26-.6 3.49 2.05 6.24 5.33 8.46 8.67 1.16 1.75 2.46 3.79 3.09 5.81.62 2.01-.65 4.26-2.72 4.76-3.76.92-7.42-3.08-9.1-5.98-1.75-3.03-2.51-6.45-3.1-9.86-.07-.42-.51-2.78-1.09-2.78-.65 0-.34 1.37-.27 1.79.78 4.61 1.84 9.28 3.95 13.49 1.74 3.47 4.77 7.56 8.87 8.24 5.3.88 5.73-5.43 4.89-9.02-1.11-4.8-3.84-9.44-6.88-13.26-2.81-3.52-6.33-7.09-10.98-7.78-4.85-.72-8.84 2.32-10.07 6.93-1.23 4.61.02 9.79 1.37 14.27 1.49 4.93 3.78 9.64 6.76 13.84 2.31 3.25 5.78 7.47 10.19 7.42 5.01-.06 3.29-7.44 2.41-10.34-1.37-4.53-4.11-8.62-7.65-11.75-3.26-2.88-8.24-4.88-12.29-2.3-3.48 2.22-3.84 6.74-3.22 10.45.73 4.43 2.68 8.75 5.65 12.12 3.16 3.59 7.31 5.8 11.82 7.25 4.56 1.46 9.58 2.75 14.37 3.08 9.11.63 17.35-4.8 22.15-12.28 5.05-7.87 5.81-17.56 4.53-26.62-.66-4.68-1.74-9.55-3.52-13.94-.79-1.94-1.9-3.51-3.92-4.24-2.02-.73-4.5-.84-6.7-.74-5.02.21-10.08 1.88-14.8 3.51-4.02 1.39-6.46 3.94-5.55 8.37.85 4.18 3.53 7.31 7.63 8.63 3.98 1.28 8.48.69 11.88-1.8 8.02-5.88 7.82-17.21 7.28-26.1-.67-11.11-2.9-22.11-6.53-32.63-.72-2.08-3.06-10.96-6.68-7.2-1.3 1.35-2.02 3.51-2.64 5.25-.83 2.35-1.39 4.79-1.76 7.26-.74 5-.64 10.07-.36 15.1.17 3.07.43 6.14.57 9.21.06 1.28.09 2.57.1 3.85 0 1.19.24 2.9-.61 3.88-1.48 1.71-4.84-.71-6.2-1.66-1.94-1.36-3.63-3.04-5.23-4.77-4.23-4.56-8.37-9.21-12.55-13.81-3.72-4.09-7.32-8.45-11.39-12.21-1.1-1.01-2.93-2.14-4.34-.96-1.38 1.14-.69 3.71-.38 5.16 1.05 4.84 3.64 9.21 6.25 13.36 2.84 4.52 6.01 8.83 9.3 13.03 3.29 4.2 6.57 8.14 10.17 11.96.22.23.04-.89-.1-1.09l-.04-.02Z"
            />
          </svg>
        </a>

        <span>
          View this <span className="font-bold">Creator Dashboard</span> on{" "}
          <a
            href="https://fwt.wtf/creator-dashboard"
            target="_blank"
            className="text-sm bg-[#CEBAF4] hover:bg-transparent text-[#333] dark:hover:text-[#f4f4f4] hover:text-[#333] font-bold py-1 px-3 rounded shadow whitespace-nowrap"
          >
            GitHub
          </a>
        </span>
      </div>

      <section className="mb-8 border rounded p-4">
        <h2 className="text-lg font-bold mb-2">📊 Aggregated Stats</h2>
        <ul className="text-sm space-y-1">
          <li>📆 Project Weeks: {stats.totalProjectWeeks}</li>
          <li>
            🕒 Hours Spent: {stats.totalHoursWorked}h
            <span className="text-gray-500 dark:text-gray-400">
              {" "}
              (avg {stats.averages.hoursWorked}h/week)
            </span>
          </li>
          {/* <li>
            📝 Blogs Published: {stats.totalContent.blogCount}
            <span className="text-gray-500 dark:text-gray-400">
              {" "}
              (avg {stats.averages.blogs}/week in {stats.blogWeeks} blog weeks)
            </span>
          </li> */}
          <li>
            📹 Videos Created: {stats.totalContent.videoCount}
            <span className="text-gray-500 dark:text-gray-400">
              {" "}
              (avg {stats.averages.videos}/week in {stats.videoWeeks} video
              weeks)
            </span>
          </li>
          <li>
            🎬 Video Recording Attempts: {stats.totalVideoTakes}
            <span className="text-gray-500 dark:text-gray-400">
              {" "}
              (avg {stats.averages.videoTakes}/week in {stats.videoWeeks} video
              weeks)
            </span>{" "}
            <i>&ldquo;Bring value. Next action. Repeat.&rdquo;</i>
          </li>
          <li>
            🚗 Travel Distance Covered:{" "}
            {stats.totalVideoKilometersTraveled}km
            <span className="text-gray-500 dark:text-gray-400">
              {" "}
              (avg {stats.averages.videoKilometersTraveled}km/week in{" "}
              {stats.videoWeeks} video weeks)
            </span>
          </li>
          <li>🔥 Perfect Weeks: {stats.totalContent.perfectWeeks}</li>
          <li>⚡ Current Streak: {stats.streaks?.current ?? 0}</li>
          <li>
            🏆 Longest Streak: {stats.streaks?.longest ?? 0}{" "}
            <i>&ldquo;Don&apos;t break the chain.&rdquo;</i>
          </li>
        </ul>
      </section>

      <YearGrid />

      <div className="flex w-full justify-center md:justify-end mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span
            id="sort-order-label"
            className="text-gray-600 dark:text-gray-300"
          >
            Sort:
          </span>
          <div
            role="group"
            aria-labelledby="sort-order-label"
            className="flex items-center gap-2"
          >
            {sortOrder === "newest" ? (
              <span
                aria-current="page"
                aria-disabled="true"
                className="rounded border px-3 py-1 transition-colors border-[#333] bg-[#CEBAF4] text-[#333] cursor-default"
              >
                Newest → Oldest
              </span>
            ) : (
              <Link
                href="/"
                className="rounded border px-3 py-1 transition-colors border-transparent bg-transparent text-[#333] dark:text-[#f4f4f4]"
              >
                Newest → Oldest
              </Link>
            )}
            {sortOrder === "oldest" ? (
              <span
                aria-current="page"
                aria-disabled="true"
                className="rounded border px-3 py-1 transition-colors border-[#333] bg-[#CEBAF4] text-[#333] cursor-default"
              >
                Oldest → Newest
              </span>
            ) : (
              <Link
                href="/?sort=oldest"
                className="rounded border px-3 py-1 transition-colors border-transparent bg-transparent text-[#333] dark:text-[#f4f4f4]"
              >
                Oldest → Newest
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 mb-4">
        {weeks.map((week) => (
          <div
            key={week.weekId}
            id={week.weekId}
            className="border rounded p-4 scroll-mt-24 transition-shadow transition-colors duration-200 target:bg-[rgba(206,186,244,0.2)] target:shadow-[0_0_0_3px_rgba(206,186,244,0.8)] target:animate-[scroll-target-fade_5s_ease-out_forwards]"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {week.weekId}
            </div>

            {week.status !== "skipped" ? <div className="font-bold">{week.topic || "—"}</div> : null}

            {week.status === "pending" ? (
              <div className="mt-2 text-sm text-[#333] bg-[#CEBAF4] rounded p-2">
                ⏳ Data is added every Saturday. Check back soon!
              </div>
            ) : (
              <>
                <div className="text-sm mt-1">
                  <span className="font-medium">Status:</span>{" "}
                  {STATUS_LABELS[week.status]}
                </div>

                {week.status !== "skipped" ? <div className="text-sm mt-1">
                  <span className="font-medium">Time:</span>{" "}
                  {Math.round(week.minutesWorked / 60)}h
                </div> : null}

                {week.status !== "skipped" ? <div className="text-sm mt-1">
                  <span className="font-medium">Video Takes:</span>{" "}
                  {week.video?.takes || 0}
                </div> : null}

                {week.status !== "skipped" ? <div className="text-sm mt-1">
                  <span className="font-medium">
                    Travel Distance for Video Recording:
                  </span>{" "}
                  {week.video?.kilometersRecorded || 0}km
                </div> : ""}

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  {week.video && (
                    <a
                      href={week.video.url}
                      target="_blank"
                      className="text-sm bg-[#CEBAF4] hover:bg-transparent text-[#333] dark:hover:text-[#f4f4f4] hover:text-[#333] font-bold py-1 px-3 rounded shadow whitespace-nowrap"
                    >
                      Video
                    </a>
                  )}
                  {week.blog && (
                    <a
                      href={week.blog.url}
                      target="_blank"
                      className="text-sm bg-[#CEBAF4] hover:bg-transparent text-[#333] dark:hover:text-[#f4f4f4] hover:text-[#333] font-bold py-1 px-3 rounded shadow whitespace-nowrap"
                    >
                      Blog
                    </a>
                  )}
                  {week.devLogVideo && (
                    <>
                      {week.devLogVideo.urls.map((url, urlIndex, urls) => (
                        <a
                          key={urlIndex}
                          href={url}
                          target="_blank"
                          className="text-sm bg-[#CEBAF4] hover:bg-transparent text-[#333] dark:hover:text-[#f4f4f4] hover:text-[#333] font-bold py-1 px-3 rounded shadow whitespace-nowrap"
                        >
                          Dev Log
                          {urls.length > 1 ? ` #${urlIndex + 1}` : ""}
                        </a>
                      ))}
                    </>
                  )}
                  {week.otherLinks && (
                    <>
                      {week.otherLinks.map(({ url, label }, urlIndex) => (
                        <a
                          key={urlIndex}
                          href={url}
                          target="_blank"
                          className="text-sm bg-[#CEBAF4] hover:bg-transparent text-[#333] dark:hover:text-[#f4f4f4] hover:text-[#333] font-bold py-1 px-3 rounded shadow whitespace-nowrap"
                        >
                          {label}
                        </a>
                      ))}
                    </>
                  )}
                </div>

                {week.status !== "skipped" ? <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
                  Weekly win(s): {week.wins || "None documented"}
                </div> : null}
              </>
            )}
          </div>
        ))}
      </div>

      <ScrollToTop />
    </main>
  );
}
