import { useEffect, useState } from "react";
import { Button, Modal, Space, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import type { TableRowSelection } from "antd/es/table/interface";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import { 
  useGetCurrenciesQuery,
  useCreateCurrencyMutation,
  useUpdateCurrencyMutation,
  useDeleteCurrencyMutation
} from "../api/currencyApi";
import { useCurrencyColumns } from "./CurrencyColumns";
import type { Currency } from "../model/type";
import { CurrencyForm } from "../../../features/currency-form/CurrencyForm";

const { Title } = Typography;

export function CurrencyTable() {
  const { t } = useTranslation("dashboard");
  const { data, isLoading: _isLoading } = useGetCurrenciesQuery();
  const [localData, setLocalData] = useState<Currency[]>([]);

  const [createCurrency] = useCreateCurrencyMutation();
  const [updateCurrency] = useUpdateCurrencyMutation();
  const [deleteCurrency] = useDeleteCurrencyMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null);

  useEffect(() => {
    if (data) setLocalData(data);
  }, [data]);

  const handleAdd = () => {
    setEditingCurrency(null);
    setIsModalVisible(true);
  };

  const handleEdit = (currency: Currency) => {
    setEditingCurrency(currency);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCurrency(id).unwrap();
      message.success(t("currencies.msgDeleted"));
    } catch {
      message.error(t("currencies.msgDeleteFailed"));
    }
  };

  const handleFinish = async (values: Currency) => {
    try {
      if (editingCurrency) {
        await updateCurrency({ id: editingCurrency.id!, currency: values }).unwrap();
        message.success(t("currencies.msgUpdated"));
      } else {
        await createCurrency(values).unwrap();
        message.success(t("currencies.msgAdded"));
      }
      setIsModalVisible(false);
    } catch {
      message.error(t("currencies.msgSaveFailed"));
    }
  };

  const columns = useCurrencyColumns({ onEdit: handleEdit, onDelete: handleDelete });

  const rowSelection: TableRowSelection<Currency> = {
    onChange: (selectedRowKeys, selectedRows) => console.log("Selected:", selectedRowKeys, selectedRows),
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Title level={3}>{t("currencies.listTitle")}</Title>
        <Button type="primary" onClick={handleAdd}>{t("currencies.addButton")}</Button>
      </Space>

      <CustomTable<Currency>
        columns={columns}
        dataSource={localData}
        rowKey="id"
        rowSelection={rowSelection}
        draggable
        // onReorder={(newData) => setLocalData(newData)}
      />

      <Modal
        title={editingCurrency ? t("currencies.modalEdit") : t("currencies.modalAdd")}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => document.getElementById("currency-form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
        okText={editingCurrency ? t("common.save") : t("common.add")}
      >
        <CurrencyForm
          initialValues={editingCurrency || undefined}
          onSubmit={handleFinish}
        />
      </Modal>
    </>
  );
}