import { useAppSelector } from "../../shared/hooks";
import { useGetMessagesQuery } from "../../entities/chat/api";
import { Badge } from "antd";

interface MessagesTabLabelProps {
    eventId: string;
}

export function MessagesTabLabel({ eventId }: MessagesTabLabelProps) {
    const user = useAppSelector(s => s.auth.user);
    const { data: messages = [] } = useGetMessagesQuery(eventId);
    const unread = messages.filter(m => !m.seenBy?.includes(user?.id ?? "")).length;

    return (
        <Badge count={unread} size="small" offset={[6, 0]}>
            Messages
        </Badge>
    );
}