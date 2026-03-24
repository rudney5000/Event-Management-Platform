import type {ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import type {LoginResponse} from "../../model/schema/loginSchema.ts";
import {storeAuthTokens} from "./storeAuthTokens.ts";
import {dispatchAuthActions} from "./dispatchAuthActions.ts";
import {errors} from "../../../../shared/config/i18n/errors.ts";

export async function handleAuthSuccess(
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
    queryFulfilled: Promise<{ data: LoginResponse }>
) {
    try {
        const { data } = await queryFulfilled;
        storeAuthTokens(data);
        dispatchAuthActions(dispatch, data);
    } catch (err) {
        console.error(errors.login.failed.en, err);
    }
}