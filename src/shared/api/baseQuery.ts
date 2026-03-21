import type {
    BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {AppError} from "./types.ts";
import {tokenService} from "../lib/token.ts";
import type {ZodType} from "zod";
import {errors} from "../config/i18n/errors.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token")

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        return headers
    },
})

export const baseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    AppError,
    object
> = async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result.error && (result.error as FetchBaseQueryError)?.status === 401) {
            const refreshToken = tokenService.getRefresh();
            if (!refreshToken) {
                tokenService.clear();
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
                const { accessToken, refreshToken: newRefreshToken } = refreshResult.data as { accessToken: string; refreshToken: string };
                tokenService.setAccess(accessToken);
                tokenService.setRefresh(newRefreshToken);

                result = await baseQuery(args, api, extraOptions);
            } else {
                tokenService.clear();
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

// Zod wrapper
export const zodBaseQuery = <T>(schema: ZodType<T>, local: "fr" | "en" | "ru") =>
    async (
        args: string | FetchArgs,
        api: BaseQueryApi,
        extraOptions?: object
    ) => {
        const result = await baseQueryWithRefresh(args, api, extraOptions ?? {});

        if ("data" in result) {
            const parsed = schema.safeParse(result.data);
            if (!parsed.success) {
                return {
                    error: {
                        type: "PARSING_ERROR",
                        message: errors.parsing.invalidResponse[local],
                        details: parsed.error.flatten(),
                    },
                };
            }
            return { data: parsed.data };
        }

        return result;
    };

export const zodBaseQueryWithLang = <T>(schema: ZodType<T>) => {
    const lang: "en" | "fr" | "ru" = navigator.language.startsWith("fr")
        ? "fr"
        : navigator.language.startsWith("ru")
            ? "ru"
            : "en";

    return zodBaseQuery<T>(schema, lang);
};