export type ChatMessage = {
    id: string;
    eventId: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: string;
    seenBy?: string[];
    optimistic?: boolean;
};

export type TypingPayload = {
    eventId: string;
    userName: string;
};

export type SeenPayload = {
    eventId: string;
    messageIds: string[];
    userId: string;
};

export type SendMessagePayload = {
    eventId: string;
    content: string;
    userId: string;
    userName: string;
};

export type JoinPayload = {
    eventId: string;
    userId: string;
    userName: string;
};