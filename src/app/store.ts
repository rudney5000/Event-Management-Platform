import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/api/authApi";
import { authSlice } from "../features/auth/model/authSlice";
import { eventsApi } from "../entities/event/api/eventsApi";
import { likeSLice } from "../features/like-event/model/likeSlice";
import { categoryApi } from "../entities/category/api";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice.reducer,
        [eventsApi.reducerPath]: eventsApi.reducer,
        likes: likeSLice.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(eventsApi.middleware)
            .concat(categoryApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch