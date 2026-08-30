import { useSortable } from "@dnd-kit/react/sortable";
import { ReactNode, useRef } from "react";
import { MdDragIndicator } from "react-icons/md";
import styles from "./sortable.module.scss";

interface SortableItemProps {
  children: ReactNode;
  id: string;
  index: number;
}

export default function SortableItem({
  children,
  id,
  index,
}: SortableItemProps) {
  const refHandle = useRef<HTMLDivElement>(null);

  const { ref } = useSortable({
    id,
    index,
    handle: refHandle,
  });

  return (
    <div key={id} ref={ref} className={styles.sortable}>
      <div ref={refHandle}>
        <MdDragIndicator className={styles.drag} />
      </div>
      {children}
    </div>
  );
}
