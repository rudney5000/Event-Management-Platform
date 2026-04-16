import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQueryWithRefresh} from "../../../shared/api/baseQuery.ts";
import {type LoginResponse, loginResponseSchema} from "../model/schema/loginSchema.ts";
import {handleAuthSuccess} from "./handlers";
import type {User} from "../slice";
import {userSchema} from "../model/schema/userSchema.ts";
import { logout as logoutAction } from '../slice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (raw) => {
        return loginResponseSchema.parse(raw);
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleAuthSuccess(dispatch, queryFulfilled);
      },
    }),
    getMe: builder.query<User, void>({
      query: () => "/api/auth/me",
        transformResponse: (raw) => userSchema.parse(raw)
    }),
    changePassword: builder.mutation<void, { oldPassword: string, newPassword: string }>({
      query: (body) => ({
        url: "/api/auth/change-password",
        method: "POST",
        body
      })
    }),
    refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: '/api/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleAuthSuccess(dispatch, queryFulfilled);
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/auth/logout',
        method: "POST"
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try{
          await queryFulfilled;
          dispatch(logoutAction())
        }catch(error){
          console.error('Logout error:', error)
        }
      },
    })
  }),
});

export const { useLoginMutation } = authApi