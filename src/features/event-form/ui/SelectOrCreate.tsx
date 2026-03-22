import { Select } from "antd";

interface SelectOrCreateProps {
  label: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SelectOrCreate({ label, value, options, onChange, placeholder }: SelectOrCreateProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <Select
        value={value}
        style={{ width: "100%" }}
        onChange={onChange}
        options={options.map((opt) => ({ value: opt, label: opt }))}
        mode="tags"
        placeholder={placeholder ?? `Select or create ${label.toLowerCase()}`}
      />
    </div>
  );
}
