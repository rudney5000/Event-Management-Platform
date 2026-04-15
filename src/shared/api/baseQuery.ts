import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {AppError} from "./types.ts";
import type {RootState} from "../../app/store/store.ts";
import {logout, setCredentials} from "../../features/auth/slice";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken
        if (token) headers.set("Authorization", `Bearer ${token}`)
        return headers
    }
})

export const baseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    AppError,
    object
> = async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result.error && (result.error as FetchBaseQueryError)?.status === 401) {
            const state = api.getState() as RootState;
            const refreshToken = state.auth.refreshToken;
            if (!refreshToken) {
                api.dispatch(logout());
                return { error: { type: "HTTP_ERROR", status: 401, message: "Unauthorized" } };
            }

            const refreshResult = await baseQuery(
                {
                    url: "/auth/refresh",
                    method: "POST",
                    body: { refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const { accessToken, refreshToken: newRefreshToken } = refreshResult.data as {
                    accessToken: string;
                    refreshToken: string
                };

                const state = api.getState() as RootState;
                api.dispatch(setCredentials({
                    user: state.auth.user!,
                    accessToken,
                    refreshToken: newRefreshToken,
                }));
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
                return { error: { type: "HTTP_ERROR", status: 401, message: "Unauthorized" } };
            }
        }

    if (result.error) {
        const err = result.error as FetchBaseQueryError;
        if (typeof err.status === "number") {
            return {
                error: {
                    type: "HTTP_ERROR",
                    status: err.status,
                    message: "Server error",
                    data: err.data,
                },
            };
        }
        return {
          error: { type: 'FETCH_ERROR', message: 'Network error' },
        };
    }

        return { data: result.data };
    };