import { Select, Button, Space, Form, AutoComplete, Tag, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SelectOrCreateTagsProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  existingTags?: string[];
  modalTitle?: string;
  entityName?: string;
}

export function SelectOrCreateTags({ 
  value = [], 
  onChange, 
  placeholder = "Sélectionner ou créer des tags",
  existingTags = [],
  modalTitle = "Ajouter un tag",
  entityName = "tag"
}: SelectOrCreateTagsProps) {
  const { t } = useTranslation("dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      const values = await form.validateFields();
      const newItem = values[entityName].trim();
      if (newItem && !value.includes(newItem)) {
        onChange?.([...value, newItem]);
      }
      setShowCreateModal(false);
      form.resetFields();
    } catch (error) {
      console.error(`Failed to create ${entityName}:`, error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleModalCancel = () => {
    setShowCreateModal(false);
    form.resetFields();
  };

  const options = existingTags.map(tag => ({
    label: tag,
    value: tag,
  }));

  return (
    <>
      <Space.Compact style={{ width: '100%' }}>
        <Select
          mode="multiple"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          style={{ flex: 1 }}
          showSearch
          filterOption={(input, option) =>
            (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
          }
          tagRender={(props) => <Tag {...props} />}
        />
        <Button 
          icon={<PlusOutlined />} 
          onClick={() => setShowCreateModal(true)}
          title={`Ajouter un nouveau ${entityName}`}
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
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 20 }}
        >
          <Form.Item
            name={entityName}
            label={t(`selectOrCreate.fields.tag.${entityName}`)}
            rules={[{ required: true, message: `${entityName} requis` }]}
          >
            <AutoComplete
              options={options}
              placeholder={t(`selectOrCreate.fields.tag.${entityName}`)}
              filterOption={(input, option) =>
                (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
