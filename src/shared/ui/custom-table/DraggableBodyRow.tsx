import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd"
const type = "DraggableRow";

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (fromIndex: number, toIndex: number) => void;
}

interface DragItem {
  index: number;
}

export const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item: DragItem) {
      if (!ref.current) return;
      if (item.index === index) return;

      moveRow(item.index, index);
      item.index = index;
    },
  });

  const [, drag] = useDrag({
    type,
    item: { index },
  });

  drag(drop(ref));

  return <tr ref={ref} {...restProps} />;
};
