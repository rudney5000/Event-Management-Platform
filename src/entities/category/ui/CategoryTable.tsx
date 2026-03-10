import { useEffect, useState } from "react";
import { getCategoryColumns } from "./CategoryColumns";
import type { TableRowSelection } from "antd/es/table/interface";
import { Button, message, Modal, Space, Typography } from "antd";
import type { Category } from "../model";
import { 
    useCreateCategoryMutation, 
    useDeleteCategoryMutation, 
    useGetCategoriesQuery, 
    useUpdateCategoryMutation 
} from "../api";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";
import { CategoryForm } from "../../../features/category-form/CategoryForm";

const { Title } = Typography;

export function CategoryTable() {
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
            message.success("Category Delete")
        } catch {
            message.error("Failed to delete category")
        }
    }
    const handleAdd = () => {
        setEditingCategory(null)
        setIsModalVisible(true)
    }

    const columns = getCategoryColumns({
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
            message.success("Category updated");
          } else {
            await createCategory( values ).unwrap()
            message.success("Category added");
          }
          setIsModalVisible(false);
        } catch{
          message.error("Failed to save category")
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
            <Title level={3}>Categories List</Title>
            <Button type="primary" onClick={handleAdd}>Add Category</Button>
          </Space>
    
          <CustomTable<Category>
            columns={columns}
            dataSource={localData}
            rowKey="id"
            rowSelection={rowSelection}
            draggable
          />
    
          <Modal
            title={editingCategory ? "Edit Category" : "Add Category"}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => document
              .getElementById("category-form")
              ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }
            okText={editingCategory ? "Save" : "Add"}
          >
            <CategoryForm
              initialValues={editingCategory || undefined}
              onSubmit={handleFinish}
            />
          </Modal>
        </>
      );
}