import { useState } from "react";
import { Button, Space, Typography } from "antd";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import type { Event } from "../../../entities/event/model/types";
import { getEventColumns } from "../../../entities/event/ui/EventColumns";
import type { TableRowSelection } from "antd/es/table/interface";

const { Title } = Typography;

const mockData: Event[] = [
  {
    id: 1,
    title: "Conference",
    date: "2026-09-12",
    city: "Paris",
    address: "10 Avenue des Champs",
    priceType: "paid",
    price: 50,
    status: "published",
    priority: 1
  },
  {
    id: 2,
    title: "Meetup",
    date: "2026-10-01",
    city: "Lyon",
    address: "5 Rue Victor Hugo",
    priceType: "free",
    status: "draft",
    priority: 2
  },
];

const rowSelection: TableRowSelection<Event> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log("Selected:", selectedRowKeys, selectedRows);
  },
};

export function EventsTable() {
  const [data, setData] = useState<Event[]>(mockData);

  const handleEdit = (event: Event) => {
    console.log("Edit", event);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((e) => e.id !== id));
  };

  const columns = getEventColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Title level={3}>Events List</Title>
        <Button type="primary">Add Event</Button>
      </Space>

      <CustomTable<Event>
        columns={columns}
        dataSource={data}
        rowKey="id"
        rowSelection={rowSelection}
        draggable
        onReorder={(newData) => setData(newData)}
      />
    </>
  );
}
