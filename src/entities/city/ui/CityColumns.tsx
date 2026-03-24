import type { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import { useTranslation } from "react-i18next";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { City } from "../model/type";
import { ColumnActions } from "../../../shared/ui/column-actions/ColumnActions";
import { useGetCurrenciesQuery } from "../../currency/api/currencyApi";

interface CityColumnsProps {
  onEdit: (city: City) => void;
  onDelete: (id: string) => void;
}

export function useCityColumns({
  onEdit,
  onDelete,
}: CityColumnsProps): ColumnsType<City> {
  const { t } = useTranslation("dashboard");
  const { data: currencies } = useGetCurrenciesQuery();

  return [
    { title: t("cities.columns.slug"), dataIndex: "slug", key: "slug" },
    { title: t("cities.columns.name"), dataIndex: "name", key: "name" },
    { title: t("cities.columns.countryCode"), dataIndex: "countryCode", key: "countryCode" },
    { 
      title: t("cities.columns.currencyId"), 
      dataIndex: "currencyId", 
      key: "currencyId",
      render: (currencyId: string) => {
        const currency = currencies?.find(c => c.id === currencyId);
        return currency ? `${currency.name} (${currency.code})` : currencyId || 'N/A';
      }
    },
    {
      title: t("cities.columns.actions"),
      key: "actions",
      render: (_: unknown, record: City) => (
        <ColumnActions
          row={record}
          items={(row) => [
            {
              key: "edit",
              label: (
                <Space>
                  <PencilIcon className="w-4 h-4" />
                  {t("cities.columns.edit")}
                </Space>
              ),
              onClick: () => onEdit(row),
            },
            {
              key: "delete",
              label: (
                <Space>
                  <TrashIcon className="w-4 h-4 text-red-500" />
                  {t("cities.columns.delete")}
                </Space>
              ),
              danger: true,
              onClick: () => onDelete(String(row.id)),
            },
          ]}
        />
      ),
    },
  ];
}
