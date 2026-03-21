import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import { tokenService } from "../../../shared/lib/token.ts";

type AuthState = {
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    isAuthenticated: !!tokenService.getAccess(),
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            tokenService.setAccess(action.payload.accessToken);
            tokenService.setRefresh(action.payload.refreshToken);
            state.isAuthenticated = true;
        },
        logout: (state) => {
            tokenService.clear();
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
