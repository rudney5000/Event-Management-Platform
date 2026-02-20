import React from "react";
import { useDrag, useDrop } from "react-dnd";

export interface SortableItemProps {
  text: string;
  index: number;
  moveItem: (from: number, to: number) => void;
  type?: string;
}

export function SortableItem({
    text, 
    index, 
    moveItem, 
    type="SORT_ITEM"
}:SortableItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item: { index: number; type: string }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      if (dragIndex === index) return;

      moveItem(dragIndex, index);
      item.index = index;
    },
  });

  const [, drag] = useDrag({
    type,
    item: { index },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="border p-2 mb-1 rounded cursor-move bg-gray-50 hover:bg-gray-100"
    >
      {text}
    </div>
  );
};
