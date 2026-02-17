import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token')
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string> ) => {
            state.token = action.payload
            state.isAuth = true
        },
        clearToken: (state) => {
            state.isAuth = false
            state.token = null
        }
    }
})

export const { setToken, clearToken } = authSlice.actions

export default authSlice.reducer