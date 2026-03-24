import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { City } from "../../entities/city/model/type";
import { SelectOrCreateCurrency } from "../../shared/ui/select-or-create";

interface CityFormProps {
  initialValues?: Partial<City>;
  onSubmit: (values: City) => void;
}

export function CityForm({ initialValues, onSubmit }: CityFormProps) {
  const { t } = useTranslation("dashboard");
  const [form] = Form.useForm<City>();

  const handleFinish = (values: City) => {
    onSubmit({ ...values });
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Form
      id="city-form"
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item name="slug" label={t("cities.form.slug")} rules={[{ required: true }]}>
        <Input placeholder={t("cities.form.slugPlaceholder")} />
      </Form.Item>

      <Form.Item name="name" label={t("cities.form.name")} rules={[{ required: true }]}>
        <Input placeholder={t("cities.form.namePlaceholder")} />
      </Form.Item>

      <Form.Item name="countryCode" label={t("cities.form.countryCode")} rules={[{ required: true }]}>
        <Input placeholder={t("cities.form.countryCodePlaceholder")} />
      </Form.Item>

      <Form.Item name="currencyId" label={t("cities.form.currency")} rules={[{ required: true }]}>
        <SelectOrCreateCurrency placeholder={t("cities.form.currencyPlaceholder")} />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="mt-4">
        {t("cities.form.submit")}
      </Button>
    </Form>
  );
}
