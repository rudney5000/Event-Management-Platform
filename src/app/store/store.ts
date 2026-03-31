import { configureStore } from "@reduxjs/toolkit";
import { persistStore} from "redux-persist"
import {rootReducer} from "./rootReducer.ts";
import {authApi} from "../../features/auth/api";
import {eventsApi} from "../../entities/event";
import {categoryApi} from "../../entities/category";
import {currencyApi} from "../../entities/currency";
import {organizerApi} from "../../entities/organizer";
import {cityApi} from "../../entities/city";
import {messagesApi} from "../../entities/chat/api";
import {registrationApi} from "../../entities/registration/api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (
      getDefaultMiddleware
  ) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/PERSIST",
            "persist/REHYDRATE",
            "persist/REGISTER",
            "persist/PURGE",
          ],
        },
      }).concat(
          authApi.middleware,
          eventsApi.middleware,
          categoryApi.middleware,
          currencyApi.middleware,
          organizerApi.middleware,
          cityApi.middleware,
          messagesApi.middleware,
          registrationApi.middleware
      )
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
