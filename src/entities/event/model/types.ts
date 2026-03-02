import type { EventFormValues } from "../../../features/event-form/ui/EventForm";

export interface GetEventsParams {
  page: number;
  limit: number;
}

export interface PaginatedEvents {
  events: EventFormValues[];
  total: number;
}