import type { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import { ColumnActions } from "../../../shared/ui/column-actions/ColumnActions";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { Category } from "../model/types";

interface CategoryColumnsProps {
  onEdit: (event: Category) => void;
  onDelete: (id: string) => void;
}

export function getCategoryColumns({
  onEdit,
  onDelete,
}: CategoryColumnsProps): ColumnsType<Category> {
  return [
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Color",
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
      title: "Description",
      dataIndex: "description",
      key: "description"
    }, 
    {
      title: "Actions",
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
  ];
}
