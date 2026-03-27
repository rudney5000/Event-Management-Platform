import storage from "redux-persist/lib/storage";

export const userPersistConfig = {
    key: 'user',
    storage
}

export const likesPersistConfig = {
    key: "likes",
    storage
}