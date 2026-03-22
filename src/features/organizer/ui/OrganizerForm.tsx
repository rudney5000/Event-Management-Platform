import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Organizer } from "../../../entities/organizer/model/type";

interface OrganizerFormProps {
    initialValues?: Partial<Organizer>
    onSubmit: (values: Organizer) => void
}

export function OrganizerForm({ initialValues, onSubmit }: OrganizerFormProps){
    const { t } = useTranslation("dashboard");
    const [form] = Form.useForm<Organizer>()

    const handleFinish = (values: Organizer) => {
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
          <Form.Item name="name" label={t("organizers.form.name")} rules={[{ required: true }]}>
            <Input placeholder={t("organizers.form.namePlaceholder")} />
          </Form.Item>
          <Form.Item name="logo" label={t("organizers.form.logo")} rules={[{ required: true }]}>
            <Input placeholder={t("organizers.form.logoPlaceholder")} />
          </Form.Item>
          <Form.Item name="contactEmail" label={t("organizers.form.contactEmail")} rules={[{ required: true }]}>
            <Input placeholder={t("organizers.form.contactEmailPlaceholder")} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4">
            {t("organizers.form.submit")}
          </Button>
        </Form>
    );
}
