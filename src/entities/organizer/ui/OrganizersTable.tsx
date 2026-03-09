import { useEffect, useState } from "react";
import { Button, Modal, Space, Typography, message } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import { useCreateOrganizerMutation, useDeleteOrganizerMutation, useGetOrganizersQuery, useUpdateOrganizerMutation } from "../api/OrganizerApi";
import type { Organizer } from "../model/type";
import { getOrganizerColumns } from "./OrganizerColumns";
import { OrganizerForm } from "../../../features/organizer/ui/OrganizerForm";

const { Title } = Typography;

export function OrganizersTable() {
  const { data, isLoading: _isLoading } = useGetOrganizersQuery();
  const [localData, setLocalData] = useState<Organizer[]>([]);

  const [createOrganizer] = useCreateOrganizerMutation();
  const [updateOrganizer] = useUpdateOrganizerMutation();
  const [deleteOrganizer] = useDeleteOrganizerMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrganizer, setEditingOrganizer] = useState<Organizer | null>(null);

  useEffect(() => {
    if (data) setLocalData(data);
  }, [data]);

  const handleAdd = () => {
    setEditingOrganizer(null);
    setIsModalVisible(true);
  };

  const handleEdit = (currency: Organizer) => {
    setEditingOrganizer(currency);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrganizer(id).unwrap();
      message.success("Organizer deleted");
    } catch {
      message.error("Failed to delete organizer");
    }
  };

  const handleFinish = async (values: Organizer) => {
    try {
      if (editingOrganizer) {
        await updateOrganizer({ id: editingOrganizer.id!, organizer: values }).unwrap();
        message.success("Organizer updated");
      } else {
        await createOrganizer(values).unwrap();
        message.success("Organizer added");
      }
      setIsModalVisible(false);
    } catch {
      message.error("Failed to save organizer");
    }
  };

  const columns = getOrganizerColumns({ onEdit: handleEdit, onDelete: handleDelete });

  const rowSelection: TableRowSelection<Organizer> = {
    onChange: (selectedRowKeys, selectedRows) => console.log("Selected:", selectedRowKeys, selectedRows),
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Title level={3}>Organizer List</Title>
        <Button type="primary" onClick={handleAdd}>Add Organizer</Button>
      </Space>

      <CustomTable<Organizer>
        columns={columns}
        dataSource={localData}
        rowKey="id"
        rowSelection={rowSelection}
        draggable
      />

      <Modal
        title={editingOrganizer ? "Edit Organizer" : "Add Organizer"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => document.getElementById("organizer-form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
        okText={editingOrganizer ? "Save" : "Add"}
      >
        <OrganizerForm
          initialValues={editingOrganizer || undefined}
          onSubmit={handleFinish}
        />
      </Modal>
    </>
  );
}