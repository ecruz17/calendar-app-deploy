export interface DateInfo {
  year: number;
  month: number;
  day: number;
}

export interface CalendarEvent {
  id?: string;
  time: Date; 
  name: string;
  isCompleted?: boolean;
}
