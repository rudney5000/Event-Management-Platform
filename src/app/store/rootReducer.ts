import {persistReducer} from "redux-persist";
import {authApi} from "../../features/auth/api";
import {eventsApi} from "../../entities/event";
import {categoryApi} from "../../entities/category";
import {currencyApi} from "../../entities/currency";
import {organizerApi} from "../../entities/organizer";
import {cityApi} from "../../entities/city";
import {authSlice} from "../../features/auth/slice";
import {combineReducers} from "@reduxjs/toolkit";
import {likeSlice} from "../../features/like-event";
import {messagesApi} from "../../entities/chat/api";
import {authPersistConfig, likesPersistConfig} from "../../shared/config/persist";
import {registrationApi} from "../../entities/registration/api";

const likesReducer = persistReducer(likesPersistConfig, likeSlice.reducer);
const authReducer = persistReducer(authPersistConfig, authSlice.reducer)

export const rootReducer = combineReducers({
    auth: authReducer,
    likes: likesReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
    [organizerApi.reducerPath]: organizerApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
});