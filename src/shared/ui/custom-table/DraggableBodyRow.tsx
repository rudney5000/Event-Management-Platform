import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd"
const type = "DraggableRow";

export const DraggableBodyRow = <T extends { [key: string]: any }>({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: any) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item: any) {
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
