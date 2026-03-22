import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Currency } from "../../entities/currency/model/type";

interface CurrencyFormProps {
    initialValues?: Partial<Currency>
    onSubmit: (values: Currency) => void
}

export function CurrencyForm({ initialValues, onSubmit }: CurrencyFormProps){
    const { t } = useTranslation("dashboard");
    const [form] = Form.useForm<Currency>()

    const handleFinish = (values: Currency) => {
        onSubmit({
            ...values
        })
    }

    useEffect(() => {
    if (initialValues) {
        form.setFieldsValue({
        ...initialValues,
        });
    } else {
        form.resetFields();
    }
    }, [initialValues, form]);

    return (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item name="code" label={t("currencies.form.code")} rules={[{ required: true }]}>
            <Input placeholder={t("currencies.form.codePlaceholder")} />
          </Form.Item>
          <Form.Item name="name" label={t("currencies.form.name")} rules={[{ required: true }]}>
            <Input placeholder={t("currencies.form.namePlaceholder")} />
          </Form.Item>
          <Form.Item name="symbol" label={t("currencies.form.symbol")} rules={[{ required: true }]}>
            <Input placeholder={t("currencies.form.symbolPlaceholder")} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4">
            {t("currencies.form.submit")}
          </Button>
        </Form>
    );
}
