import { Layout, theme } from "antd";
import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";

const { Content, Footer } = Layout;

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation("dashboard");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar collapsed={collapsed} onCollapse={setCollapsed} />

      <Layout>
        <AdminHeader background={colorBgContainer} />

        <Content style={{ margin: "0 16px" }}>
          <Outlet/>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          {t("layout.footer", { year: new Date().getFullYear() })}
        </Footer>
      </Layout>
    </Layout>
  );
}
