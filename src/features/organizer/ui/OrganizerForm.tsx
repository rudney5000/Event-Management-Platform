import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import type { Organizer } from "../../../entities/organizer/model/type";

interface OrganizerFormProps {
    initialValues?: Partial<Organizer>
    onSubmit: (values: Organizer) => void
}

export function OrganizerForm({ initialValues, onSubmit }: OrganizerFormProps){
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
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Organizer Name" />
          </Form.Item>
          <Form.Item name="logo" label="Logo" rules={[{ required: true }]}>
            <Input placeholder="Logo of Organizer" />
          </Form.Item>
          <Form.Item name="contactEmail" label="ContactEmail" rules={[{ required: true }]}>
            <Input placeholder="ContactEmail of Organizer" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4">
            Save Event
          </Button>
        </Form>
    );
}