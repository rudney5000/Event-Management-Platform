import { Layout, theme } from "antd";
import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Outlet } from "react-router";

const { Content, Footer } = Layout;

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
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
          Ant Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
