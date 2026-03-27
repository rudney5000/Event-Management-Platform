import { configureStore } from "@reduxjs/toolkit";
import { persistStore} from "redux-persist"
import {rootReducer} from "./rootReducer.ts";
import {createMiddleware} from "./middleware.ts";

export const store = configureStore({
  reducer: rootReducer,
  middleware: createMiddleware
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
