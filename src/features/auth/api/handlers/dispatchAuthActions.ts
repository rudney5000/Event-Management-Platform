import type {ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import type {LoginResponse} from "../../model/schema/loginSchema.ts";
import {loginSuccess, setUserProfile} from "../../slice";

export function dispatchAuthActions(
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
    data: LoginResponse
) {
    dispatch(loginSuccess({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
    dispatch(setUserProfile(data.user));
}