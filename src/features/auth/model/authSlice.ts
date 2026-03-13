import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: string;
  email: string;
}

interface AuthState {
  token: string | null;
  isAuth: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token'),
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearToken: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const { setToken, setUser, clearToken } = authSlice.actions;

export default authSlice.reducer