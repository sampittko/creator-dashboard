export type WeekStatus = "perfect" | "incomplete" | "skipped";

export interface WeeklyEntry {
  weekId: string;
  topic: string;

  content: {
    blogPublished: boolean;
    videoPublished: boolean;
    videoTakes: number;
    publishedAt?: {
      blog?: string;
      video?: string;
    };
  };

  time: {
    minutesWorked: number;
    daysWorked: number;
  };

  expenses: ExpenseEntry[];

  notes?: string;

  weekStatus: WeekStatus;
}

export type ExpenseType =
  | "travel"
  | "equipment"
  | "subscription"
  | "hosting"
  | "software"
  | "other";

export interface ExpenseEntry {
  label: string;
  type: ExpenseType;
  amountEUR: number;
  date: string;
  recurring?: boolean;
}

export interface AggregatedStats {
  totalMinutesWorked: number;
  totalDaysWorked: number;
  totalVideoTakes: number;

  totalExpenses: {
    all: number;
    byType: Record<ExpenseType, number>;
    recurringMonthly?: number;
  };

  totalContent: {
    blogCount: number;
    videoCount: number;
    perfectWeeks: number;
  };

  streaks?: {
    current: number;
    longest: number;
  };
}

export interface DashboardMeta {
  startedAt: string;
  lastUpdated: string;
  author: string;
  brand: string;
  public: boolean;
}
