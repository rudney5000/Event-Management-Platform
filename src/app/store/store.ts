import { configureStore } from "@reduxjs/toolkit";
import { eventsApi } from "../../entities/event";
import {likeSlice} from "../../features/like-event";
import { categoryApi } from "../../entities/category";
import { currencyApi } from "../../entities/currency";
import { organizerApi } from "../../entities/organizer";
import { cityApi } from "../../entities/city";
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { authSlice, userSlice } from "../../features/auth/slice";
import { authApi } from "../../features/auth/api";

const userPersistConfig = {
  key: 'user',
  storage
}

const likesPersistConfig = {
  key: "likes",
  storage
}

const persistedUserReducer = persistReducer(
    userPersistConfig,
    userSlice.reducer
)

const persistLikesReducer = persistReducer(
    likesPersistConfig,
    likeSlice
)
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice.reducer,
    user: persistedUserReducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    likes: persistLikesReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
    [organizerApi.reducerPath]: organizerApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER", "persist/PURGE"],
        ignoredPaths: ["register", "rehydrate"],
      },
    })
      .concat(authApi.middleware)
      .concat(eventsApi.middleware)
      .concat(categoryApi.middleware)
      .concat(currencyApi.middleware)
      .concat(organizerApi.middleware)
      .concat(cityApi.middleware),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
