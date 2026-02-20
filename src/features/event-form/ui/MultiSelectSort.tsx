import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SortableItem } from "../../../shared/ui/multi-select-sort/SortableItem";

interface MultiSelectSortProps {
  label: string;
  items: string[];
  onChange: (newItems: string[]) => void;
  
}

export function MultiSelectSort({ label, items, onChange }: MultiSelectSortProps) {
  const moveItem = (from: number, to: number) => {
    const updated = [...items];
    const [removed] = updated.splice(from, 1);
    updated.splice(to, 0, removed);
    onChange(updated);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <DndProvider backend={HTML5Backend}>
        {items.map((item, idx) => (
          <SortableItem key={item} index={idx} text={item} moveItem={moveItem} />
        ))}
      </DndProvider>
    </div>
  );
}
