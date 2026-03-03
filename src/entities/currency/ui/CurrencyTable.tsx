import { useEffect, useState } from "react";
import { Button, Modal, Space, Typography, message } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import { 
  useGetCurrenciesQuery,
  useCreateCurrencyMutation,
  useUpdateCurrencyMutation,
  useDeleteCurrencyMutation
} from "../api/currencyApi";
import { getCurrencyColumns } from "./CurrencyColumns";
import type { Currency } from "../model/type";
import { CurrencyForm } from "../../../features/currency-form/CurrencyForm";

const { Title } = Typography;

export function CurrencyTable() {
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
      message.success("Currency deleted");
    } catch {
      message.error("Failed to delete currency");
    }
  };

  const handleFinish = async (values: Currency) => {
    try {
      if (editingCurrency) {
        await updateCurrency({ id: editingCurrency.id!, currency: values }).unwrap();
        message.success("Currency updated");
      } else {
        await createCurrency(values).unwrap();
        message.success("Currency added");
      }
      setIsModalVisible(false);
    } catch {
      message.error("Failed to save currency");
    }
  };

  const columns = getCurrencyColumns({ onEdit: handleEdit, onDelete: handleDelete });

  const rowSelection: TableRowSelection<Currency> = {
    onChange: (selectedRowKeys, selectedRows) => console.log("Selected:", selectedRowKeys, selectedRows),
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Title level={3}>Currency List</Title>
        <Button type="primary" onClick={handleAdd}>Add Currency</Button>
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
        title={editingCurrency ? "Edit Currency" : "Add Currency"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => document.getElementById("currency-form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
        okText={editingCurrency ? "Save" : "Add"}
      >
        <CurrencyForm
          initialValues={editingCurrency || undefined}
          onSubmit={handleFinish}
        />
      </Modal>
    </>
  );
}