import { SelectOrCreate } from "../select-or-create";
import { useGetCurrenciesQuery } from "../../../entities/currency/api/currencyApi";
import { useCreateCurrencyMutation } from "../../../entities/currency/api/currencyApi";
import { useTranslation } from "react-i18next";

interface SelectOrCreateCurrencyProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function SelectOrCreateCurrency({ 
  value, 
  onChange, 
  placeholder = "Sélectionner ou créer une devise" 
}: SelectOrCreateCurrencyProps) {
  const { t } = useTranslation("dashboard");
  const { data: currencies = [], isLoading } = useGetCurrenciesQuery();
  const [createCurrency] = useCreateCurrencyMutation();

  const options = currencies.map((currency: { id: string; name: string; code: string }) => ({
    label: `${currency.name} (${currency.code})`,
    value: currency.id,
  }));

  const createFields = [
    {
      name: "code",
      placeholder: t("selectOrCreate.fields.currency.code"),
      rules: [{ required: true, message: "Code requis" }]
    },
    {
      name: "name",
      placeholder: t("selectOrCreate.fields.currency.name"),
      rules: [{ required: true, message: "Nom requis" }]
    },
    {
      name: "symbol",
      placeholder: t("selectOrCreate.fields.currency.symbol"),
      rules: [{ required: true, message: "Symbole requis" }]
    }
  ];

  return (
    <SelectOrCreate
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      onCreate={(values) => createCurrency(values as { code: string; name: string; symbol: string }).unwrap()}
      createFields={createFields}
      loading={isLoading}
      modalTitle={t("selectOrCreate.createCurrency")}
    />
  );
}
