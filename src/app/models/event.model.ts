export interface EventModel {
  id?: number;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  startTime?: Date;
  endTime?: Date;
  allDay?: boolean;
}
