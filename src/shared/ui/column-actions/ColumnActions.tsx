import { Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

interface ColumnActionsProps<T> {
  row: T;
  items: (row: T) => MenuProps["items"];
}

export function ColumnActions<T>({
  row,
  items,
}: ColumnActionsProps<T>) {
  return (
    <Dropdown
      menu={{ items: items(row) }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
}
