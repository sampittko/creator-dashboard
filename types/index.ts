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
  urls: string[];
}

export type OtherLink = {
  url: string;
  label: string;
}

export interface WeeklyContentEntry {
  topic: string;
  blog: BlogEntry | null;
  video: VideoEntry | null;
}

export interface WeeklyEntry {
  weekId: string;
  status: WeekStatus;
  minutesWorked: number;
  wins: string;
  contents: WeeklyContentEntry[];
  devLogVideo: DevLogVideoEntry | null;
  otherLinks: OtherLink[] | null;
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
