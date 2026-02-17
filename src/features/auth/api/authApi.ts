import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setToken } from "../model/authSlice"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) headers.set('Authorization', `Bearer ${token}`)
            return headers
        } 
    }),
    endpoints: (builder) => ({
        login: builder.mutation<{token: string}, { email: string, password: string }>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('token', data.token);
                    dispatch(setToken(data.token));
                } catch (err) {
                    console.error("Login failed", err);
                }
            }
        })
    })
})

export const { useLoginMutation } = authApi