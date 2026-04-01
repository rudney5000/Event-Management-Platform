import type {Participant} from "../../entities/event/model";
import {Tabs} from "antd";
import {MessagesTabLabel} from "./MessagesTabLabel.tsx";
import {MessagesTab} from "./MessagesTab.tsx";
import {ParticipantsTab} from "./ParticipantsTab.tsx";

interface EventSidePanelProps {
    eventId: string
    participants?: Participant[]
    participantsLoading?: boolean
}

export function EventSidePanel({ eventId, participants = [], participantsLoading }: EventSidePanelProps) {
    return (
        <Tabs
            defaultActiveKey="messages"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
            items={[
                {
                    key: "messages",
                    label: <MessagesTabLabel eventId={eventId} />,
                    children: <MessagesTab eventId={eventId} />,
                },
                {
                    key: "participants",
                    label: `Participants (${participants.length})`,
                    children: <ParticipantsTab participants={participants} isLoading={participantsLoading} />,
                },
            ]}
        />
    )
}