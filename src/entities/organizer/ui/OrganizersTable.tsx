import { useEffect, useState } from "react";
import { Button, Modal, Space, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import type { TableRowSelection } from "antd/es/table/interface";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import { useCreateOrganizerMutation, useDeleteOrganizerMutation, useGetOrganizersQuery, useUpdateOrganizerMutation } from "../api/OrganizerApi";
import type { Organizer } from "../model/type";
import { useOrganizerColumns } from "./OrganizerColumns";
import { OrganizerForm } from "../../../features/organizer/ui/OrganizerForm";

const { Title } = Typography;

export function OrganizersTable() {
  const { t } = useTranslation("dashboard");
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
      message.success(t("organizers.msgDeleted"));
    } catch {
      message.error(t("organizers.msgDeleteFailed"));
    }
  };

  const handleFinish = async (values: Organizer) => {
    try {
      if (editingOrganizer) {
        await updateOrganizer({ id: editingOrganizer.id!, organizer: values }).unwrap();
        message.success(t("organizers.msgUpdated"));
      } else {
        await createOrganizer(values).unwrap();
        message.success(t("organizers.msgAdded"));
      }
      setIsModalVisible(false);
    } catch {
      message.error(t("organizers.msgSaveFailed"));
    }
  };

  const columns = useOrganizerColumns({ onEdit: handleEdit, onDelete: handleDelete });

  const rowSelection: TableRowSelection<Organizer> = {
    onChange: (selectedRowKeys, selectedRows) => console.log("Selected:", selectedRowKeys, selectedRows),
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Title level={3}>{t("organizers.listTitle")}</Title>
        <Button type="primary" onClick={handleAdd}>{t("organizers.addButton")}</Button>
      </Space>

      <CustomTable<Organizer>
        columns={columns}
        dataSource={localData}
        rowKey="id"
        rowSelection={rowSelection}
        draggable
      />

      <Modal
        title={editingOrganizer ? t("organizers.modalEdit") : t("organizers.modalAdd")}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => document.getElementById("organizer-form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
        okText={editingOrganizer ? t("common.save") : t("common.add")}
      >
        <OrganizerForm
          initialValues={editingOrganizer || undefined}
          onSubmit={handleFinish}
        />
      </Modal>
    </>
  );
}