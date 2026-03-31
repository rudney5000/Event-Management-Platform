import type {LoginResponse} from "../../model/schema/loginSchema.ts";
import {errors} from "../../../../shared/config/i18n/errors.ts";
import type {AppDispatch} from "../../../../app/store/store.ts";
import {setCredentials} from "../../slice";

export async function handleAuthSuccess(
    dispatch: AppDispatch,
    queryFulfilled: Promise<{ data: LoginResponse }>
) {
    try {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
    } catch (err) {
        console.error(errors.login.failed.en, err);
        throw err
    }
}