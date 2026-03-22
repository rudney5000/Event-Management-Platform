import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import type { Organizer } from "../model/type";
import { ColumnActions } from "../../../shared/ui/column-actions/ColumnActions";
import { Avatar, Space } from 'antd';
import { PencilIcon, TrashIcon } from "lucide-react";

interface OrganizerColumnsProps {
    onEdit: (organizer: Organizer) => void;
    onDelete: (id: string) => void;
}

export function useOrganizerColumns({onEdit, onDelete}: OrganizerColumnsProps): ColumnsType<Organizer> {
    const { t } = useTranslation("dashboard");

    return [
      {
        title: t("organizers.columns.logo"),
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
        { title: t("organizers.columns.name"), dataIndex: "name", key: "name" },
        { title: t("organizers.columns.contactEmail"), dataIndex: "contactEmail", key: "contactEmail" },
        {
            title: t("organizers.columns.actions"),
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
                        {t("organizers.columns.edit")}
                    </Space>
                    ),
                    onClick: () => onEdit(row),
                },
                {
                    key: "delete",
                    label: (
                    <Space>
                        <TrashIcon className="w-4 h-4 text-red-500" />
                        {t("organizers.columns.delete")}
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
