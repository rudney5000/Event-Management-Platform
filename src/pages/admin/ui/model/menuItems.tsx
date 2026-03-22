import {
  AppstoreOutlined,
  DesktopOutlined,
  DollarOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Users } from "lucide-react";
import { Link } from "react-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

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

export function useAdminMenuItems(): MenuItem[] {
  const { t } = useTranslation("dashboard");

  return useMemo(
    () => [
      item(
        <Link to="/admin/dashboard">{t("nav.dashboard")}</Link>,
        "dashboard",
        <PieChartOutlined />
      ),
      item(
        <Link to="/admin/events">{t("nav.events")}</Link>,
        "events",
        <DesktopOutlined />
      ),
      item(
        <Link to="/admin/category">{t("nav.category")}</Link>,
        "category",
        <AppstoreOutlined />
      ),
      item(
        <Link to="/admin/currency">{t("nav.currency")}</Link>,
        "Currency",
        <DollarOutlined />
      ),
      item(
        <Link to="/admin/organizer">{t("nav.organizer")}</Link>,
        "Organizer",
        <Users size={18} />
      ),
    ],
    [t]
  );
}
