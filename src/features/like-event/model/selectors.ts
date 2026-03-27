import type {RootState} from "../../../app/store/store.ts";

export const selectIsLiked = (state: RootState, eventId: string) =>
    state.likes.liked[eventId];