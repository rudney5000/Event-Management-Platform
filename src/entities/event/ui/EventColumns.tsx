import type { ColumnsType } from "antd/es/table";
import { Avatar, Space, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnActions } from "../../../shared/ui/column-actions/ColumnActions";
import type { EventFormValues } from "../../../features/event-form/ui/EventForm";
import { Link } from "react-router";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useGetCategoriesQuery } from "../../category/api";
import { useGetCurrenciesQuery } from "../../currency/api/currencyApi";

interface EventColumnsProps {
  onEdit: (event: EventFormValues) => void;
  onDelete: (id: string) => void;
}

export function useEventColumns({
  onEdit,
  onDelete,
}: EventColumnsProps): ColumnsType<EventFormValues> {

  const { t } = useTranslation("dashboard");
  const { data: categories } = useGetCategoriesQuery();
  const { data: currencies } = useGetCurrenciesQuery();

  return [
    {
      title: t("events.columns.image"),
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string | string[]) => {
        const url = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
        return url ? (
          <Avatar shape="square" size={48} src={url} style={{ borderRadius: 6 }} />
        ) : (
          <Avatar shape="square" size={48} style={{ background: "#f0f0f0", color: "#aaa" }}>
            —
          </Avatar>
        );
      },
    },
    {
      title: t("events.columns.title"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("events.columns.date"),
      dataIndex: "date",
      key: "date",
    },
    {
      title: t("events.columns.city"),
      dataIndex: "city",
      key: "city",
    },
    {
      title: t("events.columns.category"),
      dataIndex: "categoryId",
      key: "category",
      render: (categoryId: string) => {
        const category = categories?.find((c) => c.id === categoryId);
        return category
          ? <Tag color="cyan">{category.name}</Tag>
          : <Tag>{categoryId ?? "—"}</Tag>;
      },
    },
    {
      title: t("events.columns.currency"),
      dataIndex: "currencyId",
      key: "currency",
      render: (currencyId: string) => {
        const currency = currencies?.find((c) => c.id === currencyId);
        return currency
          ? <Tag>{currency.symbol} {currency.code}</Tag>
          : <span style={{ color: "#aaa" }}>—</span>;
      },
    },
    {
      title: t("events.columns.price"),
      key: "price",
      render: (_, record) =>
        record.priceType === "free" ? (
          <Tag color="green">{t("events.columns.free")}</Tag>
        ) : (
          <Tag color="blue">{record.price}</Tag>
        ),
    },
    {
      title: t("events.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "published" ? "green" : "orange"}>
          {status === "published"
            ? t("events.status.published")
            : t("events.status.draft")}
        </Tag>
      ),
    },
    {
        title: t("events.columns.priority"),
        dataIndex: "priority",
        key: "priority",
        filters: [
            { text: t("events.columns.priorityHigh"), value: "1" },
            { text: t("events.columns.priorityMedium"), value: "2" },
            { text: t("events.columns.priorityLow"), value: "3" },
        ],
        onFilter: (value, record) => record.priority[0] === value,
        render: (priority) => {
            const colors: Record<string, string> = {
            1: "red",
            2: "orange",
            3: "green",
            };

            return <Tag color={colors[priority]}>{priority}</Tag>;
        },
    },    
    {
      title: t("events.columns.actions"),
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
                  {t("events.columns.edit")}
                </Space>
              ),
              onClick: () => onEdit(row),
            },
            {
              key: "delete",
              label: (
                <Space>
                  <TrashIcon className="w-4 h-4 text-red-500" />
                  {t("events.columns.delete")}
                </Space>
              ),
              danger: true,
              onClick: () => onDelete(String(row.id)),
            },
            {
              key: "preview",
              label: (
                <Link to={`/admin/events/preview/${row.id}`}>
                  <Space>
                    <EyeIcon className="w-4 h-4 text-blue-500" />
                    {t("events.columns.preview")}
                  </Space>
                </Link>
              ),
            },
          ]}
        />
      ),
    },
  ];
}
