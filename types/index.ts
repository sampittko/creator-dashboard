export type WeekStatus =
  | "not_started"
  | "future"
  | "pending"
  | "perfect"
  | "incomplete"
  | "skipped";

export interface WeeklyEntry {
  weekId: string;
  topic: string;

  content: {
    blogPublished: boolean;
    videoPublished: boolean;
    videoTakes: number;
    videoKilometersTraveled: number;
    publishedAt?: {
      blog?: string;
      video?: string;
    };
    links?: {
      blogUrl?: string;
      videoUrl?: string;
    };
  };

  time: {
    minutesWorked: number;
    daysWorked: number;
  };

  notes?: string;

  weekStatus: WeekStatus;
}

export interface AggregatedStats {
  totalMinutesWorked: number;
  totalDaysWorked: number;
  totalVideoTakes: number;
  totalVideoKilometersTraveled: number;

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
