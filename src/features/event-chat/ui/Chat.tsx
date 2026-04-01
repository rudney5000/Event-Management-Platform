import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Send, MessageCircle, X } from "lucide-react";
import { useAppSelector } from "../../../shared/hooks";
import type { ChatMessage } from "../../../entities/chat/model/type.ts";
import { useChat } from "../hook/useChat.ts";

interface ChatProps {
    eventId: string;
    eventTitle: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export function Chat({ eventId, eventTitle, isOpen = false, onClose }: ChatProps) {
    const { t } = useTranslation();
    const user = useAppSelector((state) => state.auth.user);
    const [newMessage, setNewMessage] = useState<string>("");
    const [isChatOpen, setIsChatOpen] = useState<boolean>(isOpen);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { messages, sendMessage, typingUsers, sendTyping } = useChat(eventId);

    useEffect(() => {
        const timeout = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
        return () => clearTimeout(timeout);
    }, [messages]);

    const handleSendMessage = (): void => {
        if (!newMessage.trim() || !user) return;
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
                className="fixed bottom-6 right-6 bg-[#f5c518] text-black p-4 rounded-full shadow-lg hover:bg-[#f5c518]/90 transition-all hover:scale-110 z-50"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-black border border-white/10 rounded-2xl shadow-2xl flex flex-col z-[9999] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                <div>
                    <h3 className="font-semibold text-white">{t("chat.title")}</h3>
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">
                        {eventTitle}
                    </p>
                </div>
                <button
                    onClick={() => {
                        setIsChatOpen(false);
                        onClose?.();
                    }}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        {t("chat.noMessages")}
                    </div>
                )}
                {messages.map((message: ChatMessage) => {
                    const isMine = message.userId === user?.id;
                    return (
                        <div
                            key={message.id}
                            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                        >
                            <div className="flex flex-col max-w-[80%]">
                                {!isMine && (
                                    <span className="text-xs font-semibold text-[#f5c518] mb-1">
                                        {message.userName}
                                    </span>
                                )}
                                <div
                                    className={`rounded-lg p-3 ${
                                        isMine
                                            ? "bg-[#f5c518] text-black"
                                            : "bg-white/5 text-white border border-white/10"
                                    }`}
                                >
                                    <p className="text-sm break-words">{message.content}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs opacity-70">
                                            {formatTime(message.timestamp)}
                                        </p>
                                        {isMine && (message.seenBy?.length ?? 0) > 1 && (
                                            <span className="text-[10px] opacity-70">✔✔</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {typingUsers.length > 0 && (
                    <div className="text-xs text-gray-500">
                        {typingUsers.join(", ")} is typing...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-white/5">
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
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f5c518] resize-none"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || !user}
                        className="px-4 py-2 bg-[#f5c518] text-black rounded-lg hover:bg-[#f5c518]/90 disabled:opacity-50 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}