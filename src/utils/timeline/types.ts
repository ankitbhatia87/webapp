export interface TimelineRecord {
  year: number;
  tags: string[];
  description: string;
}

export interface TimelineData extends Array<TimelineRecord> {}

export interface TimelineProps {
  data: TimelineData;
}
