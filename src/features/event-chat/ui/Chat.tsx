import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Send, MessageCircle, X } from "lucide-react";
import { useAppSelector } from "../../../shared/hooks";
import type {ChatMessage} from "../../../entities/chat/model/type.ts";
import {useChat} from "../hook/useChat.ts";

interface ChatProps {
    eventId: string;
    eventTitle: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export function Chat({
                         eventId,
                         eventTitle,
                         isOpen = false,
                         onClose,
                     }: ChatProps) {
    const { t } = useTranslation();
    const user = useAppSelector((state) => state.auth.user);

    const [newMessage, setNewMessage] = useState<string>("");
    const [isChatOpen, setIsChatOpen] = useState<boolean>(isOpen);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const { messages, sendMessage, typingUsers, sendTyping } =
        useChat(eventId);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (): void => {
        if (!newMessage.trim()) return;

        sendMessage(newMessage);
        setNewMessage("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: string): string => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!isChatOpen) {
        return (
            <button
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 z-50"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-[9999] border border-gray-200 pointer-events-auto">
            <div className="flex items-center justify-between p-4 border-b bg-indigo-600 text-white rounded-t-xl">
                <div>
                    <h3 className="font-semibold">{t("chat.title")}</h3>
                    <p className="text-xs text-indigo-100 truncate max-w-[200px]">
                        {eventTitle}
                    </p>
                </div>

                <button
                    onClick={() => {
                        setIsChatOpen(false);
                        onClose?.();
                    }}
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        {t("chat.noMessages")}
                    </div>
                )}

                {messages.map((message: ChatMessage) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.userId === user?.id
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div className="flex flex-col max-w-[80%]">
                            {message.userId !== user?.id && (
                                <span className="text-xs font-semibold text-indigo-600 mb-1">
                                    {message.userName}
                                </span>
                            )}

                            <div
                                className={`rounded-lg p-3 ${
                                    message.userId === user?.id
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white text-gray-900 shadow-sm"
                                }`}
                            >
                                <p className="text-sm">{message.content}</p>

                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-xs opacity-70">
                                        {formatTime(message.timestamp)}
                                    </p>

                                    {message.seenBy?.length &&
                                    message.userId === user?.id ? (
                                        <span className="text-[10px] opacity-70">
                                            ✔✔
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {typingUsers.length > 0 && (
                    <div className="text-xs text-gray-500">
                        {typingUsers.join(", ")} is typing...
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                    <textarea
                        value={newMessage}
                        onChange={(e) => {
                            setNewMessage(e.target.value);
                            sendTyping();
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={t("chat.placeholder")}
                        rows={1}
                        disabled={!user}
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />

                    <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || !user}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}