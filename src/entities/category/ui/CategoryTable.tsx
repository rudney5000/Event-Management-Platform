import { useEffect, useState } from "react";
import { useCategoryColumns } from "./CategoryColumns";
import type { TableRowSelection } from "antd/es/table/interface";
import { Button, message, Modal, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { Category } from "../model";
import { 
    useCreateCategoryMutation, 
    useDeleteCategoryMutation, 
    useGetCategoriesQuery, 
    useUpdateCategoryMutation 
} from "../api";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import { CategoryForm } from "../../../features/category-form";

const { Title } = Typography;

export function CategoryTable() {
    const { t } = useTranslation("dashboard");
    const [localData, setLocalData] = useState<Category[]>([])
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const { data, isLoading: _isLoading } = useGetCategoriesQuery()
    
    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    useEffect(()=> {
        setLocalData(data || [])
    }, [data])

    const handleEdit = (category: Category) => {
        setEditingCategory(category)
        setIsModalVisible(true)
    }

    const handleDelete= async (id: string) => {
        try {
            await deleteCategory(id).unwrap()
            message.success(t("categories.msgDeleted"))
        } catch {
            message.error(t("categories.msgDeleteFailed"))
        }
    }
    const handleAdd = () => {
        setEditingCategory(null)
        setIsModalVisible(true)
    }

    const columns = useCategoryColumns({
        onEdit: handleEdit,
        onDelete: handleDelete
    })

    const rowSelection: TableRowSelection<Category> = {
        onChange: (selectedRowKeys, selectRows) => {
            console.log("Selected:", selectedRowKeys, selectRows)
        }
    }

    const handleFinish = async (values: Category) => {
        try{
          if (editingCategory) {
            await updateCategory({ id: editingCategory.id!, category: values }).unwrap();
            message.success(t("categories.msgUpdated"));
          } else {
            await createCategory( values ).unwrap()
            message.success(t("categories.msgAdded"));
          }
          setIsModalVisible(false);
        } catch{
          message.error(t("categories.msgSaveFailed"))
        }
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
            <Title level={3}>{t("categories.listTitle")}</Title>
            <Button type="primary" onClick={handleAdd}>{t("categories.addButton")}</Button>
          </Space>
    
          <CustomTable<Category>
            columns={columns}
            dataSource={localData}
            rowKey="id"
            rowSelection={rowSelection}
            draggable
          />
    
          <Modal
            title={editingCategory ? t("categories.modalEdit") : t("categories.modalAdd")}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => document
              .getElementById("category-form")
              ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }
            okText={editingCategory ? t("common.save") : t("common.add")}
          >
            <CategoryForm
              initialValues={editingCategory || undefined}
              onSubmit={handleFinish}
            />
          </Modal>
        </>
      );
}