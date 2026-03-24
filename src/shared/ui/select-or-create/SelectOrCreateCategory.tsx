import { SelectOrCreate } from "../select-or-create";
import { useGetCategoriesQuery } from "../../../entities/category/api";
import { useCreateCategoryMutation } from "../../../entities/category/api";
import type { Category } from "../../../entities/category/model/types";
import { useTranslation } from "react-i18next";

interface SelectOrCreateCategoryProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function SelectOrCreateCategory({ 
  value, 
  onChange, 
  placeholder = "Sélectionner ou créer une catégorie" 
}: SelectOrCreateCategoryProps) {
  const { t } = useTranslation("dashboard");
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();

  const options = categories.map((category: Category) => ({
    label: `${category.icon || ''} ${category.name}`,
    value: category.id,
  }));

  const createFields = [
    {
      name: "name", 
      placeholder: t("selectOrCreate.fields.category.name"),
      rules: [{ required: true, message: "Nom requis" }]
    },
    {
      name: "icon",
      placeholder: t("selectOrCreate.fields.category.icon"),
      rules: [{ required: true, message: "Icône requise" }]
    },
    {
      name: "color",
      placeholder: t("selectOrCreate.fields.category.color"),
      rules: [{ required: true, message: "Couleur requise" }]
    }
  ];

  return (
    <SelectOrCreate
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      onCreate={(values) => createCategory({ ...values, id: 'temp' } as Category).unwrap()}
      createFields={createFields}
      loading={isLoading}
      modalTitle={t("selectOrCreate.createCategory")}
    />
  );
}
