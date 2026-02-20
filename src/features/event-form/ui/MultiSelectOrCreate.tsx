import { Select } from "antd";

interface MultiSelectOrCreateProps {
  label: string;
  value?: string[];
  options: string[];
  onChange: (values: string[]) => void;
}

export function MultiSelectOrCreate({
  label,
  value,
  options,
  onChange,
}: MultiSelectOrCreateProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <Select
        mode="tags"
        value={value}
        style={{ width: "100%" }}
        onChange={onChange}
        options={options.map((opt) => ({ value: opt, label: opt }))}
        placeholder={`Select or create ${label.toLowerCase()}`}
      />
    </div>
  );
}
