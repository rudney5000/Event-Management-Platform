import {createApi} from "@reduxjs/toolkit/query/react"
import {zodBaseQueryWithLang} from "../../../shared/api/baseQuery.ts";
import {type LoginResponse, loginResponseSchema} from "../model/schema/loginSchema.ts";
import {handleAuthSuccess} from "./handlers";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: zodBaseQueryWithLang(loginResponseSchema),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string, password: string }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await handleAuthSuccess(dispatch, queryFulfilled);
            }
        }),
        refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
            query: ({ refreshToken }) => ({
                url: "/auth/refresh",
                method: "POST",
                body: { refreshToken },
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await handleAuthSuccess(dispatch, queryFulfilled);
            },
        }),
    })
})

export const { useLoginMutation } = authApi