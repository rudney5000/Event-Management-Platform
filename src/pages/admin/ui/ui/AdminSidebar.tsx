import { Layout, Menu } from "antd";
import { useAdminMenuItems } from "../model/menuItems";
import { useLocation, useNavigate } from "react-router";

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

export function AdminSidebar({ collapsed, onCollapse }: Props) {

  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = useAdminMenuItems();
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
}
