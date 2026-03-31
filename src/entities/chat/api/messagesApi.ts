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
        }),
        sendMessage: builder.mutation<
            ChatMessage,
            {
                eventId: string;
                content: string;
                userId: string;
                userName: string;
            }
        >({
            query: (body) => ({
                url: `/api/messages`,
                method: "POST",
                body: {
                    ...body,
                    timestamp: new Date().toISOString(),
                    seenBy: [],
                },
            }),

            invalidatesTags: (_result, _error, arg) => [
                { type: "Messages", id: arg.eventId },
            ],
        }),
        updateMessage: builder.mutation<
            ChatMessage,
            {
                id: string;
                content: string;
            }
        >({
            query: ({ id, content }) => ({
                url: `/api/messages/${id}`,
                method: "PUT",
                body: { content },
            }),

            invalidatesTags: (_result, _error, arg) => [
                { type: "Messages", id: arg.id },
            ],
        }),
        markAsSeen: builder.mutation<
            ChatMessage,
            {
                id: string;
                userId: string;
            }
        >({
            query: ({ id, userId }) => ({
                url: `/api/messages/${id}`,
                method: "PATCH",
                body: {
                    seenBy: userId,
                },
            }),

            invalidatesTags: (_result, _error, arg) => [
                { type: "Messages", id: arg.id },
            ],
        }),
    })
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
    useUpdateMessageMutation,
    useMarkAsSeenMutation,
} = messagesApi;