import type {LoginResponse} from "../../model/schema/loginSchema.ts";
import {tokenService} from "../../../../shared/lib/token.ts";

export function storeAuthTokens(data: LoginResponse) {
    tokenService.setAccess(data.accessToken);
    tokenService.setRefresh(data.refreshToken);
}