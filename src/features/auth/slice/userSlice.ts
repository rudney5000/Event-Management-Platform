import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User, UserState} from "./types.ts";

const initialState: UserState = { profile: undefined };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = undefined;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;