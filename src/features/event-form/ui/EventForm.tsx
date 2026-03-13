import { Form, Input, Button, DatePicker, Radio, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { SelectOrCreate } from "./SelectOrCreate";
import { MultiSelectOrCreate } from "./MultiSelectOrCreate";
import { SelectPriority } from "./SelectPriority";
import dayjs, { Dayjs } from "dayjs";
import { useGetCategoriesQuery } from "../../../entities/category/api";
import { useGetCurrenciesQuery } from "../../../entities/currency/api/currencyApi";
import { useGetOrganizersQuery } from "../../../entities/organizer/api/OrganizerApi";

export interface EventFormValues {
  id: string;
  title: string;
  date: string;
  city: string;
  address: string;
  priceType: "free" | "paid";
  status: "draft" | "published";
  categoryId?: string;
  currencyId?: string;
  price?: number;
  tags?: string[];
  speakers: string[];
  priority: string;
  organizerId?: string;
}

interface EventFormProps {
  initialValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
}

interface EventFormInternalValues extends Omit<EventFormValues, 'date'> {
  date?: Dayjs;
}

export function EventForm({ initialValues, onSubmit }: EventFormProps) {
  const [form] = Form.useForm<EventFormInternalValues>();
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [speakers, setSpeakers] = useState<string[]>(initialValues?.speakers || []);
  const [priority, setPriority] = useState<string>(initialValues?.priority || "1");

  const { data: categories } = useGetCategoriesQuery()
  const { data: currencies } = useGetCurrenciesQuery()
  const { data: organizers } = useGetOrganizersQuery()

  const handleFinish = (values: EventFormInternalValues) => {
  onSubmit({
    ...values,
    date: values.date ? values.date.format("YYYY-MM-DD") : "",
    tags,
    speakers,
    priority,
  });
};

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: initialValues.date ? dayjs(initialValues.date as unknown as string) : undefined,
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
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input placeholder="Event title" />
      </Form.Item>

      <Form.Item name="date" label="Date" rules={[{ required: true }]}>
        <DatePicker
          style={{ width: "100%" }}
          value={initialValues?.date ? dayjs(initialValues.date) : undefined}
          />
      </Form.Item>

      <Form.Item name="address" label="Address" rules={[{ required: true }]}>
        <Input placeholder="Street and number" />
      </Form.Item>

      <Form.Item name="priceType" label="Price Type">
        <Radio.Group>
          <Radio value="free">Free</Radio>
          <Radio value="paid">Paid</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item dependencies={["priceType"]} noStyle>
        {({ getFieldValue }) =>
          getFieldValue("priceType") === "paid" ? (
            <>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>

              <Form.Item
                name="currencyId"
                label="Currency"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select currency">
                  {currencies?.map((currency) => (
                    <Select.Option key={currency.id} value={currency.id}>
                      {currency.symbol} {currency.code}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true }]}
      >
        <SelectOrCreate
          label="City"
          value={form.getFieldValue("city")}
          options={["Paris", "Lyon", "Marseille"]}
          onChange={(v) => form.setFieldsValue({ city: v })}
        />
      </Form.Item>
      <Form.Item
        name="organizerId"
        label="Organizer"
      >
        <Select placeholder="Select organizer" allowClear>
          {organizers?.map((organizer) => (
            <Select.Option key={organizer.id} value={organizer.id}>
              {organizer.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Radio.Group>
          <Radio value="draft">
            Draft
          </Radio>
          <Radio value="published">
            Published
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select category">
          {categories?.map((cat) => (
            <Select.Option key={cat.id} value={cat.id}>
              {cat.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
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

      <SelectPriority label="Priority" items={["1", "2", "3"]} value={priority} onChange={setPriority} />

      <Button type="primary" htmlType="submit" className="mt-4">
        Save Event
      </Button>
    </Form>
  );
}
