import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Organizer } from "../model/type";

export const organizerApi = createApi({
    reducerPath: "organizerApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL}),
    tagTypes: ["Organizer"],
    endpoints: (builder) => ({
        getOrganizers: builder.query<Organizer[], void>({
            query: () => "/api/organizer",
            providesTags: ["Organizer"]
        }),
        createOrganizer: builder.mutation<Organizer, Omit<Organizer, "id">>({
            query: (body) => ({
                url: "/api/organizer",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Organizer"]
        }),
        updateOrganizer: builder.mutation<Organizer, {id: string, organizer: Omit<Organizer, "id"> }>({
            query: ({ id, organizer }) => ({
                url: `/api/organizer/${id}`,
                method: "PUT",
                body: organizer,
            }),
            invalidatesTags: ["Organizer"]
        }),
        deleteOrganizer: builder.mutation<void, string>({
            query: (id) => ({
                url: `/api/organizer/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Organizer"]
        }),
    }),
});

export const {
    useGetOrganizersQuery,
    useCreateOrganizerMutation,
    useUpdateOrganizerMutation,
    useDeleteOrganizerMutation,
} = organizerApi