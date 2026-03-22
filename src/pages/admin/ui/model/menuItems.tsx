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
import { useLocalizedPath } from "../../../../shared/hooks/useLocalizedPath";

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
  const path = useLocalizedPath();

  return useMemo(
    () => [
      item(
        <Link to={path("/admin/dashboard")}>{t("nav.dashboard")}</Link>,
        path("/admin/dashboard"),
        <PieChartOutlined />
      ),
      item(
        <Link to={path("/admin/events")}>{t("nav.events")}</Link>,
        path("/admin/events"),
        <DesktopOutlined />
      ),
      item(
        <Link to={path("/admin/category")}>{t("nav.category")}</Link>,
        path("/admin/category"),
        <AppstoreOutlined />
      ),
      item(
        <Link to={path("/admin/currency")}>{t("nav.currency")}</Link>,
        path("/admin/currency"),
        <DollarOutlined />
      ),
      item(
        <Link to={path("/admin/organizer")}>{t("nav.organizer")}</Link>,
        path("/admin/organizer"),
        <Users size={18} />
      ),
    ],
    [t, path]
  );
}
