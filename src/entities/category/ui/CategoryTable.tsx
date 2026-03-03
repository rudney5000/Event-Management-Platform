import { useEffect, useState } from "react";
import type { Category } from "../model/types";
import { useGetCategoriesQuery } from "../api/categoryApi";
import { getCategoryColumns } from "./CategoryColumns";
import type { TableRowSelection } from "antd/es/table/interface";
import { Button, Space, Typography } from "antd";
import { CustomTable } from "../../../shared/ui/custom-table/CustomTable";

const { Title } = Typography;

export function CategoryTable() {
    const [localData, setLocalData] = useState<Category[]>([])
    
    const { data, isLoading: _isLoading } = useGetCategoriesQuery()
    
    useEffect(()=> {
        setLocalData(data)
    }, [data])

    const handleEdit = () => {}

    const handleDelete= () => {}
    const handleAdd = () => {}

    const columns = getCategoryColumns({
        onEdit: handleEdit,
        onDelete: handleDelete
    })

    const rowSelection: TableRowSelection<Category> = {
        onChange: (selectedRowKeys, selectRows) => {
            console.log("Selected:", selectedRowKeys, selectRows)
        }
    }

    return (
        <>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Title level={3}>Events List</Title>
            <Button type="primary" onClick={handleAdd}>Add Event</Button>
          </Space>
    
          <CustomTable<Category>
            columns={columns}
            dataSource={localData}
            rowKey="id"
            rowSelection={rowSelection}
            draggable
            // pagination={{
            //   current: page,
            //   pageSize: limit,
            //   total,
            //   onChange: (newPage) => setPage(newPage),
            // }}
            // onReorder={(newData) => setLocalData(newData)}
          />
{/*     
          <Modal
            title={editingEvent ? "Edit Event" : "Add Event"}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => document
              .getElementById("event-form")
              ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }
            okText={editingEvent ? "Save" : "Add"}
          >
            <EventForm
              initialValues={editingEvent || undefined}
              onSubmit={handleFinish}
            />
          </Modal> */}
        </>
      );
}