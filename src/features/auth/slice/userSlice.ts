import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type User = {
  id: string;
  email: string;
};

type UserState = {
  profile?: User;
};

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