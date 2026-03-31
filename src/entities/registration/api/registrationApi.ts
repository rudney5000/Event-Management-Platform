import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RegistrationRequest, RegistrationResponse} from "../model/types.ts";

export const registrationApi = createApi({
    reducerPath: "registrationApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Registrations"],
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationRequest>({
            query: (data) => ({
                url: "/api/registrations",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Registrations"],
        }),
        getEventRegistrations: builder.query({
            query: (eventId) => `/registrations?eventId=${eventId}`,
            providesTags: ["Registrations"],
        }),
    }),
});

export const { useRegisterMutation, useGetEventRegistrationsQuery } = registrationApi;