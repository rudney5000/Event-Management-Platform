import type { ColumnsType } from "antd/es/table";
import type { Organizer } from "../model/type";
import { ColumnActions } from "../../../shared/ui/column-actions/ColumnActions";
import { Avatar, Space } from 'antd';
import { PencilIcon, TrashIcon } from "lucide-react";

interface OrganizerColumnsProps {
    onEdit: (organizer: Organizer) => void;
    onDelete: (id: string) => void;
}

export function getOrganizerColumns({onEdit, onDelete}: OrganizerColumnsProps): ColumnsType<Organizer> {
    return [
      {
        title: "Logo",
        dataIndex: "logo",
        key: "logo",
        render: (logo: string | string[]) => {
          const url = Array.isArray(logo) ? logo[0] : logo;
          return url ? (
            <Avatar shape="square" size={48} src={url} style={{ borderRadius: 6 }} />
          ) : (
            <Avatar shape="square" size={48} style={{ background: "#f0f0f0", color: "#aaa" }}>
              —
            </Avatar>
          );
        },
      },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "ContactEmail", dataIndex: "contactEmail", key: "contactEmail" },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, record: Organizer) => (
            <ColumnActions
                row={record}
                items={(row) => [
                {
                    key: "edit",
                    label: (
                    <Space>
                        <PencilIcon className="w-4 h-4" />
                        Edit
                    </Space>
                    ),
                    onClick: () => onEdit(row),
                },
                {
                    key: "delete",
                    label: (
                    <Space>
                        <TrashIcon className="w-4 h-4 text-red-500" />
                        Delete
                    </Space>
                    ),
                    danger: true,
                    onClick: () => onDelete(String(row.id)),
                }
                ]}
            />
            ),
        },
    ]
}