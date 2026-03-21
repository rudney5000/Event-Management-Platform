import {createApi} from "@reduxjs/toolkit/query/react"
import {zodBaseQueryWithLang} from "../../../shared/api/baseQuery.ts";
import {type LoginResponse, loginResponseSchema} from "../model/schema/loginSchema.ts";
import {tokenService} from "../../../shared/lib/token.ts";
import {errors} from "../../../shared/config/i18n/errors.ts";
import {loginSuccess, setUserProfile} from "../slice";

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
                try {
                    const { data } = await queryFulfilled;
                    tokenService.setAccess(data.accessToken)
                    tokenService.setRefresh(data.refreshToken)
                    dispatch(loginSuccess({
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken
                    }));
                    dispatch(setUserProfile(data.user))
                } catch (err) {
                    console.error(errors.login.failed.en, err);
                }
            }
        }),
        refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
            query: ({ refreshToken }) => ({
                url: "/auth/refresh",
                method: "POST",
                body: { refreshToken },
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    tokenService.setAccess(data.accessToken);
                    tokenService.setRefresh(data.refreshToken);
                    dispatch(loginSuccess({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
                    dispatch(setUserProfile(data.user));
                } catch (err) {
                    console.error(errors.login.failed.en, err);
                }
            },
        }),
    })
})

export const { useLoginMutation } = authApi