import { SelectOrCreate } from "../select-or-create";
import { useGetOrganizersQuery } from "../../../entities/organizer/api/OrganizerApi";
import { useCreateOrganizerMutation } from "../../../entities/organizer/api/OrganizerApi";
import { useTranslation } from "react-i18next";

interface SelectOrCreateOrganizerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function SelectOrCreateOrganizer({ 
  value, 
  onChange, 
  placeholder = "Sélectionner ou créer un organisateur" 
}: SelectOrCreateOrganizerProps) {
  const { t } = useTranslation("dashboard");
  const { data: organizers = [], isLoading } = useGetOrganizersQuery();
  const [createOrganizer] = useCreateOrganizerMutation();

  const options = organizers.map((organizer: { id: string; name: string }) => ({
    label: organizer.name,
    value: organizer.id,
  }));

  const createFields = [
    {
      name: "name", 
      placeholder: t("selectOrCreate.fields.organizer.name"),
      rules: [{ required: true, message: "Nom requis" }]
    },
    {
      name: "logo",
      placeholder: t("selectOrCreate.fields.organizer.logo")
    },
    {
      name: "contactEmail",
      placeholder: t("selectOrCreate.fields.organizer.contactEmail"),
      rules: [{ required: true, message: "Email requis" }]
    }
  ];

  return (
    <SelectOrCreate
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      onCreate={(values) => createOrganizer(values as { name: string; logo: string; contactEmail: string }).unwrap()}
      createFields={createFields}
      loading={isLoading}
      modalTitle={t("selectOrCreate.createOrganizer")}
    />
  );
}
