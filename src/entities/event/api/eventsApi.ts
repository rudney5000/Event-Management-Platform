import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { EventFormValues } from "../../../features/event-form/ui/EventForm";

export const eventsApi = createApi({
    reducerPath: "eventsApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Events"],
    endpoints: (builder) => ({
        getEvents: builder.query<EventFormValues[], void>({
            query: () => "/api/events",
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
        })
    })
})

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;