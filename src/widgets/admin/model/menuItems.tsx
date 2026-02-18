import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const item = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({
  key,
  icon,
  children,
  label,
});

export const menuItems: MenuItem[] = [
  item("Dashboard", "1", <PieChartOutlined />),
  item("Reports", "2", <DesktopOutlined />),
  item("Users", "sub1", <UserOutlined />, [
    item("Tom", "3"),
    item("Bill", "4"),
    item("Alex", "5"),
  ]),
  item("Teams", "sub2", <TeamOutlined />, [
    item("Team 1", "6"),
    item("Team 2", "8"),
  ]),
  item("Files", "9", <FileOutlined />),
];
