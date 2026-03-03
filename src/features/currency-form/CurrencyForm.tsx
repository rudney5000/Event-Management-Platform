import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import type { Currency } from "../../entities/currency/model/type";

interface CurrencyFormProps {
    initialValues?: Partial<Currency>
    onSubmit: (values: Currency) => void
}

export function CurrencyForm({ initialValues, onSubmit }: CurrencyFormProps){
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
          <Form.Item name="code" label="Code" rules={[{ required: true }]}>
            <Input placeholder="Currency Code" />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Name of currency" />
          </Form.Item>
          <Form.Item name="symbol" label="Symbol" rules={[{ required: true }]}>
            <Input placeholder="Symbol of currency" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4">
            Save Event
          </Button>
        </Form>
    );
}