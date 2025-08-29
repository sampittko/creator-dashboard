export type WeekStatus =
  | "not_started"
  | "future"
  | "pending"
  | "perfect"
  | "incomplete"
  | "skipped";

export interface BlogEntry {
  publishedAt: string;
  url: string;
}

export interface VideoEntry {
  publishedAt: string;
  url: string;
  takes: number;
  kilometersRecorded: number;
}

export interface DevLogVideoEntry {
  url: string;
}

export interface WeeklyEntry {
  weekId: string;
  topic: string;
  status: WeekStatus;
  minutesWorked: number;
  wins: string;
  blog: BlogEntry | null;
  video: VideoEntry | null;
  devLogVideo: DevLogVideoEntry | null;
}

export interface AggregatedStats {
  totalMinutesWorked: number;
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
