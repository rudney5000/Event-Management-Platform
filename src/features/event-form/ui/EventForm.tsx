import { Form, Input, Button, DatePicker, Radio, InputNumber } from "antd";
import { useState } from "react";
import { SelectOrCreate } from "./SelectOrCreate";
import { MultiSelectOrCreate } from "./MultiSelectOrCreate";
import { MultiSelectSort } from "./MultiSelectSort";

export interface EventFormValues {
  id?: string;
  title: string;
  date: string;
  city: string;
  address: string;
  priceType: "free" | "paid";
  status: "draft" | "published";
  price?: number;
  tags?: string[];
  speakers: string[];
  priority: string[];
}

interface EventFormProps {
  initialValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
}

export function EventForm({ initialValues, onSubmit }: EventFormProps) {
  const [form] = Form.useForm<EventFormValues>();
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [speakers, setSpeakers] = useState<string[]>(initialValues?.speakers || []);
  const [priority, setPriority] = useState<string[]>(initialValues?.priority || []);

  const handleFinish = (values: EventFormValues) => {
    onSubmit({ ...values, tags, speakers, priority });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input placeholder="Event title" />
      </Form.Item>

      <Form.Item name="date" label="Date" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <SelectOrCreate
        label="City"
        value={initialValues?.city}
        options={["Paris", "Lyon", "Marseille"]}
        onChange={(v) => form.setFieldsValue({ city: v })}
      />

      <Form.Item name="address" label="Address" rules={[{ required: true }]}>
        <Input placeholder="Street and number" />
      </Form.Item>

      <Form.Item name="priceType" label="Price Type">
        <Radio.Group>
          <Radio value="free">Free</Radio>
          <Radio value="paid">Paid</Radio>
        </Radio.Group>
      </Form.Item>

      {form.getFieldValue("priceType") === "paid" && (
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
      )}

      <MultiSelectOrCreate
        label="Tags"
        value={tags}
        options={["Tech", "Business", "Health"]}
        onChange={setTags}
      />

      <MultiSelectOrCreate
        label="Speakers"
        value={speakers}
        options={["Alice", "Bob", "Charlie"]}
        onChange={setSpeakers}
      />

      <MultiSelectSort label="Priority" items={priority} onChange={setPriority} />

      <Button type="primary" htmlType="submit" className="mt-4">
        Save Event
      </Button>
    </Form>
  );
}
