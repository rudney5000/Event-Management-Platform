import type {ZodType} from "zod";
import type {BaseQueryApi, FetchArgs} from "@reduxjs/toolkit/query";
import {zodBaseQuery} from "./zodBaseQuery.ts";

export const zodBaseQueryWithLang = <T>(schema: ZodType<T>) =>
    (args: string | FetchArgs, api: BaseQueryApi, extraOptions?: object) => {
        const lang: "en" | "fr" | "ru" = navigator.language.startsWith("fr")
            ? "fr"
            : navigator.language.startsWith("ru")
                ? "ru"
                : "en";

        return zodBaseQuery<T>(schema, lang)(args, api, extraOptions ?? {});
    };