import type { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnActions } from "../../../shared/ui/column-actions/ColumnActions";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { Category } from "../model";

interface CategoryColumnsProps {
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function useCategoryColumns({
  onEdit,
  onDelete,
}: CategoryColumnsProps): ColumnsType<Category> {
  const { t } = useTranslation("dashboard");

  return [
    {
      title: t("categories.columns.icon"),
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: t("categories.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("categories.columns.color"),
      dataIndex: "color",
      key: "color",
      render: (color: string) => (
        <span
          className="inline-block w-6 h-6 rounded-full"
          style={{ backgroundColor: color }}
        />
      ),
    },
    {
      title: t("categories.columns.description"),
      dataIndex: "description",
      key: "description"
    }, 
    {
      title: t("categories.columns.actions"),
      key: "actions",
      render: (_, record) => (
        <ColumnActions
          row={record}
          items={(row) => [
            {
              key: "edit",
              label: (
                <Space>
                  <PencilIcon className="w-4 h-4" />
                  {t("categories.columns.edit")}
                </Space>
              ),
              onClick: () => onEdit(row),
            },
            {
              key: "delete",
              label: (
                <Space>
                  <TrashIcon className="w-4 h-4 text-red-500" />
                  {t("categories.columns.delete")}
                </Space>
              ),
              danger: true,
              onClick: () => onDelete(String(row.id)),
            }
          ]}
        />
      ),
    },
  ];
}
