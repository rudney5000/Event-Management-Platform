import { createApi } from "@reduxjs/toolkit/query/react";
import type {ChatMessage} from "../model/type.ts";
import {getSocket} from "../../../shared/api/socket.ts";
import {baseQueryWithRefresh} from "../../../shared/api/baseQuery.ts";

export const messagesApi = createApi({
    reducerPath: "messagesApi",
    baseQuery: baseQueryWithRefresh,
    tagTypes: ["Messages"],
    endpoints: (builder) => ({
        getMessages: builder.query<ChatMessage[], string>({
            query: () => `/api/messages`,
            providesTags: ["Messages"],

            async onCacheEntryAdded(eventId, {
                updateCachedData,
                cacheDataLoaded,
                cacheEntryRemoved
            }) {
                const socket = getSocket();

                try {
                    await cacheDataLoaded;

                    socket.emit("join_room", "global");

                    socket.on("message", (message: ChatMessage) => {
                        updateCachedData((draft) => {
                            const exists = draft.some(m => m.id === message.id);
                            if (!exists) draft.push(message);
                        });
                    });

                    socket.on("message_updated", (updated: ChatMessage) => {
                        updateCachedData((draft) => {
                            const index = draft.findIndex(m => m.id === updated.id);
                            if (index !== -1) draft[index] = updated;
                        });
                    });

                } catch (error) {
                    console.error("WebSocket connection error:", error);
                }

                await cacheEntryRemoved;
                socket.emit("leave_room", eventId);
                socket.off("message");
                socket.off("message_updated");
            }
        }),
        sendMessage: builder.mutation<
            ChatMessage,
            {
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
            })
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
            })
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
            })
        }),
    })
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
    useUpdateMessageMutation,
    useMarkAsSeenMutation,
} = messagesApi;