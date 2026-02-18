import { Layout, Menu } from "antd";
import { menuItems } from "../model/menuItems";

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

export function AdminSidebar({ collapsed, onCollapse }: Props) {
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
    </Sider>
  );
}
