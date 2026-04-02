import type {ZodType} from "zod";
import type {BaseQueryApi, FetchArgs} from "@reduxjs/toolkit/query";
import {errors} from "../config/i18n/errors.ts";
import {baseQueryWithRefresh} from "./baseQuery.ts";

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
