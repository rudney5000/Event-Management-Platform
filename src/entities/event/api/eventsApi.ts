import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  EventBasePayload,
  EventFull,
  EventTranslationPayload,
  GetEventsParams,
  PaginatedEvents
} from "../model";
import type { EventFormValues } from "../../../features/event-form";

export interface CreateEventPayload {
  base: EventBasePayload;
  translation: EventTranslationPayload;
}

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Events", "Browse"],
  endpoints: (builder) => ({
    getEvents: builder.query<PaginatedEvents, GetEventsParams>({
      query: ({ page, limit, lang }) =>
        `/api/events?_page=${page}&_limit=${limit}${lang ? `&lang=${lang}` : ""}`,
      transformResponse: (response: EventFull[], meta) => ({
        events: response,
        total: Number(meta?.response?.headers.get("X-Total-Count") || 0),
      }),
      providesTags: ["Events"],
    }),
    createAdminEvent: builder.mutation<EventFull, CreateEventPayload>({
      query: (payload) => ({
        url: "/api/admin/events",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Events", "Browse"],
    }),
    updateEvent: builder.mutation<EventFormValues, { id: string; event: Partial<EventFormValues> }>({
      query: ({ id, event }) => ({
        url: `/api/events/${id}/`,
        method: "PUT",
        body: event,
      }),
      invalidatesTags: ["Events", "Browse"],
    }),
    updateAdminEventBase: builder.mutation<EventFull, { id: string; base: Partial<EventBasePayload> }>({
      query: ({ id, base }) => ({
        url: `/api/admin/events/${id}`,
        method: "PUT",
        body: base,
      }),
      invalidatesTags: ["Events", "Browse"],
    }),
    upsertEventTranslation: builder.mutation<EventFull, { id: string; lang: "fr" | "en" | "ru"; translation: Omit<EventTranslationPayload, "lang"> }>({
      query: ({ id, lang, translation }) => ({
        url: `/api/admin/events/${id}/translations/${lang}`,
        method: "PUT",
        body: translation,
      }),
      invalidatesTags: ["Events", "Browse"],
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events", "Browse"],
    }),
    getEventById: builder.query<EventFull, { id: string; lang?: string } | string>({
      query: (arg) => {
        if (typeof arg === "string") {
          return `/api/events/${arg}`;
        }
        const { id, lang } = arg;
        return `/api/events/${id}${lang ? `?lang=${lang}` : ""}`;
      },
      providesTags: (result, _error, arg) => {
        const id = typeof arg === "string" ? arg : arg.id;
        return result ? [{ type: "Events", id }] : [];
      },
    }),
  }),
});

export const {
  useGetEventsQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventByIdQuery,
} = eventsApi;
