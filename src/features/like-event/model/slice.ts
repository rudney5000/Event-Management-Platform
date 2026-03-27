import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {LikeState} from "./types.ts";

const initialState: LikeState = {
  liked: {},
};

export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.liked[id] = !state.liked[id];
    },
  },
});

export const { toggleLike } = likeSlice.actions;
