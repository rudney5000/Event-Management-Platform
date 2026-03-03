import type { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import type { Currency } from "../model/type";
import { PencilIcon, TrashIcon } from "lucide-react";
import { ColumnActions } from "../../../shared/ui/column-actions/ColumnActions";

interface CurrencyColumnsProps {
  onEdit: (currency: Currency) => void;
  onDelete: (id: string) => void;
}

export function getCurrencyColumns({
  onEdit,
  onDelete,
}: CurrencyColumnsProps): ColumnsType<Currency> {
  return [
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Symbol", dataIndex: "symbol", key: "symbol" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Currency) => (
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