import type { ColumnsType } from "antd/es/table";
import { Avatar, Space, Tag } from "antd";
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

  const { data: categories } = useGetCategoriesQuery();
  const { data: currencies } = useGetCurrenciesQuery();

  return [
    {
      title: "Image",
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Category",
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
      title: "Currency",
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
      title: "Price",
      key: "price",
      render: (_, record) =>
        record.priceType === "free" ? (
          <Tag color="green">Free</Tag>
        ) : (
          <Tag color="blue">{record.price}</Tag>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "published" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        filters: [
            { text: "High (1)", value: "1" },
            { text: "Medium (2)", value: "2" },
            { text: "Low (3)", value: "3" },
        ],
        onFilter: (value, record) => record.priority[0] === value,
        render: (priority) => {
            const colors: any = {
            1: "red",
            2: "orange",
            3: "green",
            };

            return <Tag color={colors[priority]}>{priority}</Tag>;
        },
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
            },
            {
              key: "preview",
              label: (
                <Link to={`/admin/events/preview/${row.id}`}>
                  <Space>
                    <EyeIcon className="w-4 h-4 text-blue-500" />
                    Preview
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
