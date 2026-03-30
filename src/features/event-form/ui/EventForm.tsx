import { 
  Form, 
  Input, 
  Button, 
  DatePicker, 
  Radio, 
  InputNumber 
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectPriority } from "./SelectPriority";
import { 
  SelectOrCreateCity, 
  SelectOrCreateOrganizer, 
  SelectOrCreateCategory, 
  SelectOrCreateTags, 
  SelectOrCreateCurrency 
} from "../../../shared/ui/select-or-create";
import dayjs, { Dayjs } from "dayjs";

export interface EventFormValues {
  id: string;
  title: string;
  date: string;
  cityId: string;
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
  const { t } = useTranslation("dashboard");
  const [form] = Form.useForm<EventFormInternalValues>();
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [speakers, setSpeakers] = useState<string[]>(initialValues?.speakers || []);
  const [priority, setPriority] = useState<string>(initialValues?.priority || "1");

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
      <Form.Item name="title" label={t("events.form.title")} rules={[{ required: true }]}>
        <Input placeholder={t("events.form.titlePlaceholder")} />
      </Form.Item>

      <Form.Item name="date" label={t("events.form.date")} rules={[{ required: true }]}>
        <DatePicker
          style={{ width: "100%" }}
          value={initialValues?.date ? dayjs(initialValues.date) : undefined}
          />
      </Form.Item>

      <Form.Item name="address" label={t("events.form.address")} rules={[{ required: true }]}>
        <Input placeholder={t("events.form.addressPlaceholder")} />
      </Form.Item>

      <Form.Item name="priceType" label={t("events.form.priceType")}>
        <Radio.Group>
          <Radio value="free">{t("events.form.free")}</Radio>
          <Radio value="paid">{t("events.form.paid")}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item dependencies={["priceType"]} noStyle>
        {({ getFieldValue }) =>
          getFieldValue("priceType") === "paid" ? (
            <>
              <Form.Item
                name="price"
                label={t("events.form.price")}
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>

              <Form.Item
                name="currencyId"
                label={t("events.form.currency")}
                rules={[{ required: true }]}
              >
                <SelectOrCreateCurrency placeholder={t("events.form.currencyPlaceholder")} />
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
      <Form.Item
        name="cityId"
        label={t("events.form.city")}
        rules={[{ required: true }]}
      >
        <SelectOrCreateCity placeholder={t("events.form.citySelectPlaceholder")} />
      </Form.Item>
      <Form.Item
        name="organizerId"
        label={t("events.form.organizer")}
      >
        <SelectOrCreateOrganizer placeholder={t("events.form.organizerPlaceholder")} />
      </Form.Item>
      <Form.Item name="status" label={t("events.form.status")}>
        <Radio.Group>
          <Radio value="draft">
            {t("events.form.draft")}
          </Radio>
          <Radio value="published">
            {t("events.form.published")}
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="categoryId"
        label={t("events.form.category")}
        rules={[{ required: true }]}
      >
        <SelectOrCreateCategory placeholder={t("events.form.categoryPlaceholder")} />
      </Form.Item>
      <Form.Item name="tags" label={t("events.form.tags")}>
        <SelectOrCreateTags 
          value={tags}
          onChange={setTags}
          placeholder={t("events.form.tagsPlaceholder")}
          existingTags={["Tech", "Business", "Health", "Education", "Finance"]}
          modalTitle={t("selectOrCreate.createTag")}
          entityName="tag"
        />
      </Form.Item>

      <Form.Item name="speakers" label={t("events.form.speakers")}>
        <SelectOrCreateTags 
          value={speakers}
          onChange={setSpeakers}
          placeholder={t("events.form.speakersPlaceholder")}
          existingTags={["Alice", "Bob", "Charlie", "David", "Emma"]}
          modalTitle={t("selectOrCreate.createSpeaker")}
          entityName="speaker"
        />
      </Form.Item>

      <SelectPriority
        label={t("events.form.priority")}
        items={["1", "2", "3"]}
        value={priority}
        onChange={setPriority}
        getItemLabel={(item) => t("events.form.priorityItem", { n: item })}
      />

      <Button type="primary" htmlType="submit" className="mt-4">
        {t("events.form.submit")}
      </Button>
    </Form>
  );
}
