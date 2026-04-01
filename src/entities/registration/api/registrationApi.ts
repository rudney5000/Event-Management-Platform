import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {BaseQueryFn} from "@reduxjs/toolkit/query";
import type {RegistrationRequest, RegistrationResponse} from "../model/types.ts";

const rawBaseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL });

const baseQueryWithTimeout: BaseQueryFn = async (args, api, extraOptions) => {
    const ms = 45_000;
    const timeoutCtrl = new AbortController();
    const tid = setTimeout(() => timeoutCtrl.abort(), ms);
    const signal =
        typeof AbortSignal !== "undefined" && "any" in AbortSignal && api.signal
            ? AbortSignal.any([api.signal, timeoutCtrl.signal])
            : timeoutCtrl.signal;
    try {
        return await rawBaseQuery(args, api, {
            ...extraOptions,
            signal,
        });
    } finally {
        clearTimeout(tid);
    }
};

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