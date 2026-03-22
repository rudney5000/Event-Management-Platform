import { useTranslation } from "react-i18next";

export function DashboardPage() {
  const { t } = useTranslation("dashboard");
  return <h1>{t("page.title")}</h1>;
}