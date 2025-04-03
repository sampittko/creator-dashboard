import { WeekStatus } from "@/types";

export function statusToEmoji(status: WeekStatus | "future" | "pending"): string {
  switch (status) {
    case "perfect":
      return "✅";
    case "incomplete":
      return "⚠️";
    case "skipped":
      return "❌";
    case "pending":
      return "🕒";
    case "future":
      return "◻️";
    case "not_started":
    default:
      return "▫️";
  }
}
