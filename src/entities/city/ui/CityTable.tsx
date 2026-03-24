import { useEffect, useState } from "react";
import { Button, message, Modal, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { TableRowSelection } from "antd/es/table/interface";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import type { City } from "../model/type";
import {
  useCreateCityMutation,
  useDeleteCityMutation,
  useGetCitiesQuery,
  useUpdateCityMutation,
} from "../api";
import { useCityColumns } from "./CityColumns";
import { CityForm } from "../../../features/city-form";

const { Title } = Typography;

export function CityTable() {
  const { t } = useTranslation("dashboard");
  const { data, isLoading: _isLoading } = useGetCitiesQuery();
  const [localData, setLocalData] = useState<City[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);

  const [createCity] = useCreateCityMutation();
  const [updateCity] = useUpdateCityMutation();
  const [deleteCity] = useDeleteCityMutation();

  useEffect(() => {
    if (data) setLocalData(data);
  }, [data]);

  const handleAdd = () => {
    setEditingCity(null);
    setIsModalVisible(true);
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCity(id).unwrap();
      message.success(t("cities.msgDeleted"));
    } catch {
      message.error(t("cities.msgDeleteFailed"));
    }
  };

  const handleFinish = async (values: City) => {
    try {
      const { id: _ignoredId, ...cityPayload } = values;
      if (editingCity) {
        await updateCity({ id: editingCity.id, city: cityPayload }).unwrap();
        message.success(t("cities.msgUpdated"));
      } else {
        await createCity(cityPayload).unwrap();
        message.success(t("cities.msgAdded"));
      }
      setIsModalVisible(false);
    } catch {
      message.error(t("cities.msgSaveFailed"));
    }
  };

  const columns = useCityColumns({ onEdit: handleEdit, onDelete: handleDelete });

  const rowSelection: TableRowSelection<City> = {
    onChange: (selectedRowKeys, selectedRows) => console.log("Selected:", selectedRowKeys, selectedRows),
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Title level={3}>{t("cities.listTitle")}</Title>
        <Button type="primary" onClick={handleAdd}>{t("cities.addButton")}</Button>
      </Space>

      <CustomTable<City>
        columns={columns}
        dataSource={localData}
        rowKey="id"
        rowSelection={rowSelection}
        draggable
      />

      <Modal
        title={editingCity ? t("cities.modalEdit") : t("cities.modalAdd")}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => document.getElementById("city-form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
        okText={editingCity ? t("common.save") : t("common.add")}
      >
        <CityForm
          initialValues={editingCity || undefined}
          onSubmit={handleFinish}
        />
      </Modal>
    </>
  );
}
