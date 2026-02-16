import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        login: builder.mutation<{token: string}, { email: string, password: string }>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body
            })
        })
    })
})

export const { useLoginMutation } = authApi