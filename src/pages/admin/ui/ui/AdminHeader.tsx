import { Layout } from "antd";

const { Header } = Layout;

interface Props {
  background: string;
}

export function AdminHeader({ background }: Props) {
  return <Header style={{ padding: 0, background }} />;
}