import { Breadcrumb, theme } from "antd";

export function AdminContent() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[{ title: "User" }, { title: "Bill" }]}
      />

      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        Bill is a cat.
      </div>
    </>
  );
}
