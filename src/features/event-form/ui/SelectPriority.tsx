
interface SelectPriorityProps {
  label: string;
  items: string[];
  value: string;
  onChange: (value: string) => void;
  getItemLabel?: (item: string) => string;
}

export function SelectPriority({ label, items, value, onChange, getItemLabel }: SelectPriorityProps) {

  return (
    <div className="mb-4">

      <label className="block mb-1 font-medium">
        {label}
      </label>

      {items.map(item => (

        <div
          key={item}
          onClick={() => onChange(item)}
          className={`
            border p-2 mb-1 rounded cursor-pointer

            ${value === item
              ? "bg-blue-100 border-blue-400"
              : "bg-gray-50"
            }
          `}
        >

          {getItemLabel ? getItemLabel(item) : `Priority ${item}`}

        </div>

      ))}

    </div>
  );
}
