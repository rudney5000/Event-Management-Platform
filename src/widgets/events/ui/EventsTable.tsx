import { useEffect, useState } from "react";
import { 
  Button, 
  message, 
  Modal, 
  Space, 
  Typography 
} from "antd";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import { getEventColumns } from "../../../entities/event/ui/EventColumns";
import type { TableRowSelection } from "antd/es/table/interface";
import { EventForm, type EventFormValues } from "../../../features/event-form/ui/EventForm";
import { 
  useCreateEventMutation, 
  useDeleteEventMutation, 
  useGetEventsQuery, 
  useUpdateEventMutation 
} from "../../../entities/event/api/eventsApi";

const { Title } = Typography;


export function EventsTable() {
  const [localData, setLocalData] = useState<EventFormValues[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormValues | null>(null);

  const { data: eventsFromServer = [], isLoading: _isLoading } = useGetEventsQuery();
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  useEffect(() => {
    setLocalData(eventsFromServer);
  }, [eventsFromServer]);

  const handleEdit = (event: EventFormValues) => {
    setEditingEvent(event);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id).unwrap();
      message.success("Event Delete")
    } catch {
      message.error("Failed to delete event")
    }
  };

  const handleAdd = () => {
    setEditingEvent(null);
    setIsModalVisible(true);
  };

  const handleFinish = async (values: EventFormValues) => {
    try{
      if (editingEvent) {
        await updateEvent({ id: editingEvent.id!, event: values }).unwrap();
        message.success("Event updated");
      } else {
        await createEvent( values ).unwrap()
        message.success("Event added");
      }
      setIsModalVisible(false);
    } catch{
      message.error("Failed to save event")
    }
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
        dataSource={localData}
        rowKey="id"
        rowSelection={rowSelection}
        draggable
        onReorder={(newData) => setLocalData(newData)}
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
