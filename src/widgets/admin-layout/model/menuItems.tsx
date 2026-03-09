import {
  AppstoreOutlined,
  DesktopOutlined,
  DollarOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Users } from "lucide-react";
import { Link } from "react-router";

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
  item(<Link to="/admin/dashboard">Dashboard</Link>, "dashboard", <PieChartOutlined />),
  item(<Link to="/admin/events">Events</Link>, "events", <DesktopOutlined />),
  item(<Link to="/admin/category">Category</Link>, "category", <AppstoreOutlined />),
  item(<Link to="/admin/currency">Currency</Link>, "Currency", <DollarOutlined />),
  item(<Link to="/admin/organizer">Organizer</Link>, "Organizer", <Users size={18}/>),
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
