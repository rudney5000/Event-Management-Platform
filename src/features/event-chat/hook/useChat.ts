import { useEffect, useState, useRef, useCallback } from "react";
import { useAppSelector } from "../../../shared/hooks";
import { useGetMessagesQuery } from "../../../entities/chat/api";
import { getSocket } from "../../../shared/api/socket.ts";
import type {
    ChatMessage,
    JoinPayload,
    SeenPayload,
    SendMessagePayload,
    TypingPayload
} from "../../../entities/chat/model/type.ts";

export function useChat(eventId: string) {
    const user = useAppSelector((state) => state.auth.user);

    const { data: initialMessages } = useGetMessagesQuery(eventId);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);

    const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const socketRef = useRef(getSocket());

    useEffect(() => {
        if (initialMessages) {
            setMessages(initialMessages);
        }
    }, [initialMessages]);

    useEffect(() => {
        if (!eventId || !user) return;

        const socket = socketRef.current;

        socket.connect();

        const joinPayload: JoinPayload = {
            eventId,
            userId: user.id,
            userName: user.email,
        };

        socket.emit("join", joinPayload);

        socket.on("message", (message: ChatMessage) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on("typing", (payload: TypingPayload) => {
            if (payload.userName === user.email) return;

            setTypingUsers((prev) =>
                Array.from(new Set([...prev, payload.userName]))
            );

            setTimeout(() => {
                setTypingUsers((prev) =>
                    prev.filter((u) => u !== payload.userName)
                );
            }, 2000);
        });

        socket.on("seen", (payload: SeenPayload) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    payload.messageIds.includes(msg.id)
                        ? {
                            ...msg,
                            seenBy: Array.from(
                                new Set([...(msg.seenBy || []), payload.userId])
                            ),
                        }
                        : msg
                )
            );
        });

        return () => {
            socket.emit("leave", {
                eventId,
                userId: user.id,
            });

            socket.off("message");
            socket.off("typing");
            socket.off("seen");
        };
    }, [eventId, user]);

    const sendMessage = useCallback(
        (content: string) => {
            if (!user) return;

            const socket = socketRef.current;

            const optimisticMessage: ChatMessage = {
                id: `temp-${Date.now()}`,
                eventId,
                content,
                userId: user.id,
                userName: user.email,
                seenBy: [user.id],
                timestamp: new Date().toISOString(),
                optimistic: true,
            };

            setMessages((prev) => [...prev, optimisticMessage]);

            const payload: SendMessagePayload = {
                eventId,
                content,
                userId: user.id,
                userName: user.email,
            };

            socket.emit("message", payload);
        },
        [eventId, user]
    );

    const sendTyping = useCallback(() => {
        if (!user) return;
        if (typingTimeout.current) return;

        const socket = socketRef.current;

        const payload: TypingPayload = {
            eventId,
            userName: user.email,
        };

        socket.emit("typing", payload);

        typingTimeout.current = setTimeout(() => {
            typingTimeout.current = null;
        }, 1000);
    }, [eventId, user]);

    useEffect(() => {
        if (!messages.length || !user) return;

        const unseen = messages
            .filter(
                (m) =>
                    m.userId !== user.id &&
                    !(m.seenBy || []).includes(user.id)
            )
            .map((m) => m.id);

        if (unseen.length === 0) return;

        const socket = socketRef.current;

        const payload: SeenPayload = {
            eventId,
            messageIds: unseen,
            userId: user.id,
        };

        socket.emit("seen", payload);
    }, [messages, eventId, user]);

    return {
        messages,
        typingUsers,
        sendMessage,
        sendTyping,
    };
}