import {persistReducer} from "redux-persist";
import {authApi} from "../../features/auth/api";
import {eventsApi} from "../../entities/event";
import {categoryApi} from "../../entities/category";
import {currencyApi} from "../../entities/currency";
import {organizerApi} from "../../entities/organizer";
import {cityApi} from "../../entities/city";
import {likesPersistConfig, userPersistConfig} from "./persistConfig.ts";
import {authSlice, userSlice} from "../../features/auth/slice";
import {combineReducers} from "@reduxjs/toolkit";
import {likeSlice} from "../../features/like-event";

const userReducer = persistReducer(userPersistConfig, userSlice.reducer);
const likesReducer = persistReducer(likesPersistConfig, likeSlice.reducer);

export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    user: userReducer,
    likes: likesReducer,

    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
    [organizerApi.reducerPath]: organizerApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
});