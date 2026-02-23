import { useState } from "react";
import { Button, message, Modal, Space, Typography } from "antd";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import { getEventColumns } from "../../../entities/event/ui/EventColumns";
import type { TableRowSelection } from "antd/es/table/interface";
import { EventForm, type EventFormValues } from "../../../features/event-form/ui/EventForm";

const { Title } = Typography;

const mockData: EventFormValues[] = [
  {
    id: "1",
    title: "Conference",
    date: "2026-09-12",
    city: "Paris",
    address: "10 Avenue des Champs",
    priceType: "paid",
    price: 50,
    status: "published",
    speakers: ["Joe"],
    priority: "1"
  },
  {
    id: "2",
    title: "Meetup",
    date: "2026-10-01",
    city: "Lyon",
    address: "5 Rue Victor Hugo",
    priceType: "free",
    status: "draft",
    speakers: ["Joe"],
    priority: "2"
  },
];

export function EventsTable() {
  const [data, setData] = useState<EventFormValues[]>(mockData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormValues | null>(null);

  const handleEdit = (event: EventFormValues) => {
    setEditingEvent(event);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((e) => e.id !== id));
    message.success("Event deleted");
  };

  const handleAdd = () => {
    setEditingEvent(null);
    setIsModalVisible(true);
  };

  const handleFinish = (values: EventFormValues) => {
    if (editingEvent) {
      setData((prev) =>
        prev.map((e) => (e.id === editingEvent.id ? { ...editingEvent, ...values } : e))
      );
      message.success("Event updated");
    } else {
      const newEvent = { ...values, id: Date.now().toString() };
      setData((prev) => [...prev, newEvent]);
      message.success("Event added");
    }
    setIsModalVisible(false);
  };

  const columns = getEventColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const rowSelection: TableRowSelection<EventFormValues> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected:", selectedRowKeys, selectedRows);
    },
  };

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
        <Button type="primary" onClick={handleAdd}>Add Event</Button>
      </Space>

      <CustomTable<EventFormValues>
        columns={columns}
        dataSource={data}
        rowKey="id"
        rowSelection={rowSelection}
        draggable
        onReorder={(newData) => setData(newData)}
      />

      <Modal
        title={editingEvent ? "Edit Event" : "Add Event"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => document.getElementById("event-form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
        okText={editingEvent ? "Save" : "Add"}
      >
        <EventForm
          initialValues={editingEvent || undefined}
          onSubmit={handleFinish}
        />
      </Modal>
    </>
  );
}
