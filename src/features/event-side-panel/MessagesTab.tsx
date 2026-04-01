import {useAppSelector} from "../../shared/hooks";
import {useGetMessagesQuery, useSendMessageMutation} from "../../entities/chat/api";
import {useEffect, useRef, useState} from "react";
import {Button, Empty, Input, Spin, Typography} from 'antd';
import type { ChatMessage } from '../../entities/chat/model/type';
import {Send} from "lucide-react";

interface MessagesTabProps {
    eventId: string;
}

export function MessagesTab({ eventId }: MessagesTabProps) {
    const user = useAppSelector(s => s.auth.user);
    const { data: messages = [], isLoading } = useGetMessagesQuery(eventId);
    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !user) return;
        await sendMessage({
            content: input,
            userId: user.id,
            userName: user.email,
        }).unwrap();
        setInput("");
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-280px)]">
            <div className="flex-1 overflow-y-auto py-2 space-y-2">
                {messages.length === 0 && (
                    <Empty
                        description="Aucun message"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        className="mt-10"
                    />
                )}
                {messages.map((msg: ChatMessage) => {
                    const isAdmin = msg.userId === user?.id;
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isAdmin ? 'justify-end' : 'justify-start'} px-3`}
                        >
                            <div className="max-w-[85%]">
                                {!isAdmin && (
                                    <Typography.Text className="block text-xs text-indigo-500 mb-1">
                                        {msg.userName}
                                    </Typography.Text>
                                )}
                                <div className={`px-3 py-2 rounded-lg text-sm ${
                                    isAdmin
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                }`}>
                                    {msg.content}
                                    <div className="text-xs opacity-60 mt-1 text-right">
                                        {new Date(msg.timestamp).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                        {isAdmin && (msg.seenBy?.length ?? 0) > 1 && " ✔✔"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-200 mt-2">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onPressEnter={handleSend}
                    placeholder="Répondre..."
                    size="small"
                    className="flex-1"
                />
                <Button
                    type="primary"
                    size="small"
                    icon={<Send size={14} />}
                    onClick={handleSend}
                    loading={isSending}
                    disabled={!input.trim()}
                    className="bg-indigo-500 hover:bg-indigo-600"
                />
            </div>
        </div>
    );
}