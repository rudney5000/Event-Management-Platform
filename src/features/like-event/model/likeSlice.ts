import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LikeState {
  likedIds: string[];
}

const initialState: LikeState = {
  likedIds: JSON.parse(localStorage.getItem("likedEvents") || "[]"),
};

export const likeSLice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (state.likedIds.includes(id)) {
        state.likedIds = state.likedIds.filter(i => i !== id);
      } else {
        state.likedIds.push(id);
      }

      localStorage.setItem("likedEvents", JSON.stringify(state.likedIds));
    },
  },
});

export const { toggleLike } = likeSLice.actions;
export default likeSLice.reducer;