import storage from "redux-persist/lib/storage";

export const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "accessToken", "refreshToken", "isAuthenticated"]
};