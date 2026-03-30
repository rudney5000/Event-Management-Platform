import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Button, 
  message, 
  Modal, 
  Space, 
  Typography 
} from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import { CustomTable } from "../../shared/ui/custom-table/CustomTable";
import { EventForm, type EventFormValues } from "../event-form";
import { 
  useDeleteEventMutation,
  useGetEventsQuery, 
  useUpdateEventMutation 
} from "../../entities/event/api/eventsApi";
import { useEventColumns } from "../../entities/event";
import type { EventFull } from "../../pages/admin/AdminEventPreviewPage";

const { Title } = Typography;


export function EventsTable() {
  const { t } = useTranslation("dashboard");
  const [localData, setLocalData] = useState<EventFull[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormValues | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { 
    data, 
    isLoading: _isLoading 
  } = useGetEventsQuery({ page, limit });
  
  const total = data?.total || 0;
  const events = data?.events || [];

  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  useEffect(() => {
    setLocalData(events);
  }, [data]);

  const handleEdit = (event: EventFormValues) => {
    setEditingEvent(event);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id).unwrap();
      message.success(t("events.msgDeleted"))
    } catch {
      message.error(t("events.msgDeleteFailed"))
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
        message.success(t("events.msgUpdated"));
      } else {
        // await createEvent( values ).unwrap()
        message.success(t("events.msgAdded"));
      }
      setIsModalVisible(false);
    } catch{
      message.error(t("events.msgSaveFailed"))
    }
  };

  const columns = useEventColumns({
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
        <Title level={3}>{t("events.listTitle")}</Title>
        <Button type="primary" onClick={handleAdd}>{t("events.addButton")}</Button>
      </Space>

      <CustomTable<EventFormValues>
        columns={columns}
        dataSource={localData}
        rowKey="id"
        rowSelection={rowSelection}
        draggable
        pagination={{
          current: page,
          pageSize: limit,
          total,
          onChange: (newPage) => setPage(newPage),
        }}
        onReorder={(newData) => setLocalData(newData)}
      />

      <Modal
        title={editingEvent ? t("events.modalEdit") : t("events.modalAdd")}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => document
          .getElementById("event-form")
          ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
        }
        okText={editingEvent ? t("common.save") : t("common.add")}
      >
        <EventForm
          initialValues={editingEvent || undefined}
          onSubmit={handleFinish}
        />
      </Modal>
    </>
  );
}
