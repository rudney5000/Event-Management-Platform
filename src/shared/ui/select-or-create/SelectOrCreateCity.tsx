import { SelectOrCreate } from "../select-or-create";
import { useGetCitiesQuery } from "../../../entities/city/api/cityApi";
import { useCreateCityMutation } from "../../../entities/city/api/cityApi";
import type { City } from "../../../entities/city/model/type";
import { useTranslation } from "react-i18next";

interface SelectOrCreateCityProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function SelectOrCreateCity({ 
  value, 
  onChange, 
  placeholder = "Sélectionner ou créer une ville" 
}: SelectOrCreateCityProps) {
  const { t } = useTranslation("dashboard");
  const { data: cities = [], isLoading } = useGetCitiesQuery();
  const [createCity] = useCreateCityMutation();

  const options = cities.map((city: City) => ({
    label: `${city.name} (${city.countryCode})`,
    value: city.id,
  }));

  const createFields = [
    {
      name: "slug",
      placeholder: t("selectOrCreate.fields.city.slug"),
      rules: [{ required: true, message: "Slug requis" }]
    },
    {
      name: "name", 
      placeholder: t("selectOrCreate.fields.city.name"),
      rules: [{ required: true, message: "Nom requis" }]
    },
    {
      name: "countryCode",
      placeholder: t("selectOrCreate.fields.city.countryCode"),
      rules: [{ required: true, message: "Code pays requis" }]
    },
    {
      name: "currencyId",
      placeholder: t("selectOrCreate.fields.city.currencyId"),
      rules: [{ required: true, message: "Devise requise" }]
    }
  ];

  return (
    <SelectOrCreate<City>
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      onCreate={(values: Record<string, unknown>) => 
        createCity(values as Omit<City, 'id'>).unwrap()
      }
      createFields={createFields}
      loading={isLoading}
      modalTitle={t("selectOrCreate.createCity")}
    />
  );
}
