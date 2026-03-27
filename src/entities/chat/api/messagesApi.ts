import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {ChatMessage} from "../model/type.ts";
import {getSocket} from "../../../shared/api/socket.ts";

export const messagesApi = createApi({
    reducerPath: "messagesApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Messages"],
    endpoints: (builder) => ({
        getMessages: builder.query<ChatMessage[], string>({
            query: () => `/api/messages`,
            async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded }) {
                const socket = getSocket();

                await cacheDataLoaded;

                socket.on("message", (message) => {
                    updateCachedData((draft) => {
                        draft.push(message);
                    });
                });
            },
            providesTags: (_result, _error, eventId) => [
                { type: "Messages", id: eventId }
            ]
        })
    })
});

export const { useGetMessagesQuery } = messagesApi;