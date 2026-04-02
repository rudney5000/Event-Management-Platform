import {createApi} from "@reduxjs/toolkit/query/react";
import type {RegistrationRequest, RegistrationResponse} from "../model/types.ts";
import {baseQueryWithTimeout} from "../../../shared/api/baseQueryWithTimeout.ts";

export const registrationApi = createApi({
    reducerPath: "registrationApi",
    baseQuery: baseQueryWithTimeout,
    tagTypes: ["Registrations"],
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationRequest>({
            query: (data) => ({
                url: "/api/registrations",
                method: "POST",
                body: { ...data, numberOfTickets: 1 },
            }),
            invalidatesTags: ["Registrations"],
        }),
        getEventRegistrations: builder.query({
            query: (eventId) => `/api/registrations?eventId=${eventId}`,
            providesTags: ["Registrations"],
        }),
    }),
});

export const { useRegisterMutation, useGetEventRegistrationsQuery } = registrationApi;