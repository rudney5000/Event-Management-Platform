import { Table } from "antd";
import type { TableProps } from "antd";
import type { Key } from "react";
import { DraggableBodyRow } from "./DraggableBodyRow";

interface CustomTableProps<T> extends TableProps<T> {
  rowKey: string | ((record: T) => Key);
  draggable?: boolean;
  onReorder?: (newData: T[]) => void;
}

interface CustomRowProps<T> {
  record: T;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CustomTable<T extends object>({
  rowKey,
  draggable = false,
  onReorder,
  dataSource,
  ...props
}: CustomTableProps<T>) {

    const components = draggable
    ? {
        body: {
          row: (rowProps: CustomRowProps<T>) => (
            <DraggableBodyRow
              {...rowProps}
              moveRow={(fromIndex: number, toIndex: number) => {
                if (!dataSource) return;
                const newData = [...dataSource];
                const [moved] = newData.splice(fromIndex, 1);
                newData.splice(toIndex, 0, moved);
                onReorder?.(newData);
              }}
            />
          ),
        },
      }
    : undefined;
    
  return (
    <Table<T>
      rowKey={rowKey}
      dataSource={dataSource}
      pagination={{ pageSize: 5 }}
      components={components}
      {...props}
    />
  );
}
