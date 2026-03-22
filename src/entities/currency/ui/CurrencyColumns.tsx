import type { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import { useTranslation } from "react-i18next";
import type { Currency } from "../model/type";
import { PencilIcon, TrashIcon } from "lucide-react";
import { ColumnActions } from "../../../shared/ui/column-actions/ColumnActions";

interface CurrencyColumnsProps {
  onEdit: (currency: Currency) => void;
  onDelete: (id: string) => void;
}

export function useCurrencyColumns({
  onEdit,
  onDelete,
}: CurrencyColumnsProps): ColumnsType<Currency> {
  const { t } = useTranslation("dashboard");

  return [
    { title: t("currencies.columns.code"), dataIndex: "code", key: "code" },
    { title: t("currencies.columns.name"), dataIndex: "name", key: "name" },
    { title: t("currencies.columns.symbol"), dataIndex: "symbol", key: "symbol" },
    {
      title: t("currencies.columns.actions"),
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
                  {t("currencies.columns.edit")}
                </Space>
              ),
              onClick: () => onEdit(row),
            },
            {
              key: "delete",
              label: (
                <Space>
                  <TrashIcon className="w-4 h-4 text-red-500" />
                  {t("currencies.columns.delete")}
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
