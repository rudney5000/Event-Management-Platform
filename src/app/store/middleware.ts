import type {configureStore} from "@reduxjs/toolkit";
import {authApi} from "../../features/auth/api";
import {eventsApi} from "../../entities/event";
import {categoryApi} from "../../entities/category";
import {currencyApi} from "../../entities/currency";
import {organizerApi} from "../../entities/organizer";
import {cityApi} from "../../entities/city";

export const createMiddleware =
    (getDefaultMiddleware: ReturnType<typeof configureStore>["middleware"]) =>
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
            cityApi.middleware
        );