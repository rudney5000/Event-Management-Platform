import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { ColumnActions } from "../../../shared/ui/column-actions/ColumnActions";
import type { EventFormValues } from "../../../features/event-form/ui/EventForm";

interface EventColumnsProps {
  onEdit: (event: EventFormValues) => void;
  onDelete: (id: string) => void;
}

export function getEventColumns({
  onEdit,
  onDelete,
}: EventColumnsProps): ColumnsType<EventFormValues> {
  return [
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
      title: "Price",
      key: "price",
      render: (_, record) =>
        record.priceType === "free" ? (
          <Tag color="green">Free</Tag>
        ) : (
          <Tag color="blue">{record.price} €</Tag>
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
              label: "Edit",
              onClick: () => onEdit(row),
            },
            {
              key: "delete",
              label: "Delete",
              danger: true,
              onClick: () => onDelete(String(row.id)),
            },
          ]}
        />
      ),
    },
  ];
}
