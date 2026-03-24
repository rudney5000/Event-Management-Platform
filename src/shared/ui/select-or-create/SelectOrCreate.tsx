import { Select, Input, Button, Space, Form, AutoComplete, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Rule } from "antd/es/form";

interface SelectOrCreateProps<T> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
  onCreate?: (values: Record<string, unknown>) => Promise<T>;
  createFields: Array<{
    name: string;
    placeholder: string;
    rules?: Rule[];
    type?: 'text' | 'autocomplete';
    autocompleteOptions?: string[];
  }>;
  loading?: boolean;
  modalTitle?: string;
}

export function SelectOrCreate<T>({
  value,
  onChange,
  placeholder = "Sélectionner ou créer",
  options,
  onCreate,
  createFields,
  loading = false,
  modalTitle = "Créer un nouvel élément",
}: SelectOrCreateProps<T>) {
  const { t } = useTranslation("dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      const values = await form.validateFields();
      const newItem = await onCreate!(values);
      onChange?.((newItem as T & { id: string }).id);
      setShowCreateModal(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to create item:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleModalCancel = () => {
    setShowCreateModal(false);
    form.resetFields();
  };

  return (
    <>
      <Space.Compact style={{ width: '100%' }}>
        <Select
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          style={{ flex: 1 }}
          showSearch
          filterOption={(input, option) =>
            (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
          }
          loading={loading}
        />
        <Button 
          icon={<PlusOutlined />} 
          onClick={() => setShowCreateModal(true)}
          title="Créer un nouvel élément"
        >
          +
        </Button>
      </Space.Compact>

      <Modal
        title={modalTitle}
        open={showCreateModal}
        onCancel={handleModalCancel}
        onOk={handleCreate}
        confirmLoading={isCreating}
        okText={t("selectOrCreate.create")}
        cancelText={t("selectOrCreate.cancel")}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 20 }}
        >
          {createFields.map((field) => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.placeholder}
              rules={field.rules || [{ required: true, message: `${field.name} requis` }]}
            >
              {field.type === 'autocomplete' ? (
                <AutoComplete
                  options={field.autocompleteOptions?.map(opt => ({ value: opt, label: opt }))}
                  placeholder={field.placeholder}
                  filterOption={(input, option) =>
                    (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              ) : (
                <Input placeholder={field.placeholder} />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
}
