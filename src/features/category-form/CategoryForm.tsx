import { Button, Form, Input } from "antd";
import type { Category } from "../../entities/category/model/types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface CategoryFormProps {
    initialValues?: Partial<Category>
    onSubmit: (values: Category) => void
}

export function CategoryForm({ initialValues, onSubmit }: CategoryFormProps){
    const { t } = useTranslation("dashboard");
    const [form] = Form.useForm<Category>()

    const handleFinish = (values: Category) => {
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
          <Form.Item name="icon" label={t("categories.form.icon")} rules={[{ required: true }]}>
            <Input placeholder={t("categories.form.iconPlaceholder")} />
          </Form.Item>
    
          {/* <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker
              style={{ width: "100%" }}
              value={initialValues?.date ? dayjs(initialValues.date) : undefined}
              />
          </Form.Item> */}
    
          <Form.Item name="name" label={t("categories.form.name")} rules={[{ required: true }]}>
            <Input placeholder={t("categories.form.namePlaceholder")} />
          </Form.Item>
    
          {/* <Form.Item name="priceType" label="Price Type">
            <Radio.Group>
              <Radio value="free">Free</Radio>
              <Radio value="paid">Paid</Radio>
            </Radio.Group>
          </Form.Item>
     */}
          {/* <Form.Item dependencies={["priceType"]} noStyle>
            {({ getFieldValue }) =>
              getFieldValue("priceType") === "paid" ? (
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              ) : null
            }
          </Form.Item> */}
    
          {/* <Form.Item
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
     */}
          {/* <MultiSelectOrCreate
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
    
          <SelectPriority label="Priority" items={["1", "2", "3"]} value={priority} onChange={setPriority} /> */}
    
          <Button type="primary" htmlType="submit" className="mt-4">
            {t("categories.form.submit")}
          </Button>
        </Form>
    );
}
