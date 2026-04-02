import type {BaseQueryFn} from "@reduxjs/toolkit/query";
import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL });

export const baseQueryWithTimeout: BaseQueryFn = async (args, api, extraOptions) => {
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