import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetEventsParams, PaginatedEvents } from "../model/types";
import type { EventFull } from "../../../pages/admin/AdminEventPreviewPage";
import type { EventFormValues } from "../../../features/event-form";

export const eventsApi = createApi({
    reducerPath: "eventsApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Events"],
    endpoints: (builder) => ({
        getEvents: builder.query<PaginatedEvents, GetEventsParams>({
            query: ({ page, limit }) => `/api/events?_page=${page}&_limit=${limit}`,
            transformResponse: (response: EventFormValues[], meta) => ({
                events: response,
                total: Number(meta?.response?.headers.get("X-Total-Count") || 0),
            }),
            providesTags: ["Events"],
        }),
        createEvent: builder.mutation<EventFormValues, Partial<EventFormValues>>({
            query: (event) => ({
                url: "/api/events",
                method: "POST",
                body: event
            }),
            invalidatesTags: ["Events"]
        }),
        updateEvent: builder.mutation<EventFormValues, {id: string, event: Partial<EventFormValues>}>({
            query: ({id, event}) => ({
                url: `/api/events/${id}/`,
                method: "PUT",
                body: event
            }),
            invalidatesTags: ["Events"]
        }),
        deleteEvent: builder.mutation<void, string>({
            query: (id) => ({
                url: `/api/events/${id}`,
                method: "DELETE"                
            }),
            invalidatesTags: ["Events"]
        }),
        getEventById: builder.query<EventFull, string>({
            query: (id) => `/api/events/${id}`,
            providesTags: (result, error, id) =>
                result ? [{ type: 'Events', id }] : [],
        })
    })
})

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventByIdQuery,
} = eventsApi;