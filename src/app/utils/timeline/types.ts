export interface TimelineRecord {
  year: number;
  tags: string[];
  description: string;
}

export type TimelineData = TimelineRecord[];

export interface TimelineProps {
  data: TimelineData;
}
