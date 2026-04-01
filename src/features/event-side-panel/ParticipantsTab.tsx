import type {Participant} from "../../entities/event/model";
import {Avatar, Empty, Spin, Typography} from 'antd';
import {UserOutlined} from "@ant-design/icons";

export function ParticipantsTab({ participants, isLoading }: { participants: Participant[], isLoading?: boolean }) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Spin size="large" />
            </div>
        );
    }

    if (participants.length === 0) {
        return (
            <Empty
                description="Aucun participant"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className="mt-10"
            />
        );
    }

    return (
        <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100vh-280px)]">
            {participants.map(participant => (
                <div
                    key={participant.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100"
                >
                    <Avatar
                        icon={<UserOutlined />}
                        size={40}
                        className="bg-indigo-500 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <Typography.Text strong className="block text-sm truncate">
                            {participant.userName}
                        </Typography.Text>
                        {participant.userEmail && (
                            <Typography.Text type="secondary" className="block text-xs truncate">
                                {participant.userEmail}
                            </Typography.Text>
                        )}
                        {participant.userPhone && (
                            <Typography.Text type="secondary" className="block text-xs truncate mt-0.5">
                                {participant.userPhone}
                            </Typography.Text>
                        )}
                        <div className="flex gap-2 mt-1">
                            {participant.status && (
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    participant.status === 'confirmed'
                                        ? 'bg-green-100 text-green-700'
                                        : participant.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                }`}>
                  {participant.status}
                </span>
                            )}
                            {participant.paymentStatus && participant.paymentStatus !== 'free' && (
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    participant.paymentStatus === 'paid'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                }`}>
                  {participant.paymentStatus === 'paid' ? 'Payé' : 'En attente'}
                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}