import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {AuthState} from "./types.ts";
import type {LoginResponse} from "../model/schema/loginSchema.ts";

const initialState: AuthState = {
    isAuthenticated: false,
    user: undefined,
    accessToken: undefined
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginResponse>) => {
            const { user, accessToken, refreshToken } = action.payload;

            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = undefined;
            state.accessToken = undefined;
            state.refreshToken = undefined;
            state.isAuthenticated = false;
        },
    },
});

export const { logout, setCredentials } = authSlice.actions;
