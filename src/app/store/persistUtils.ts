import { persistor } from "../store/store";

export const clearPersistedData = () => {
    persistor.purge().then(() => {
        console.log("Redux-persist cleared");
    });
}
