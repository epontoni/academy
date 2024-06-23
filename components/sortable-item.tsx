"use client";

import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface Item {
  _id: string;
  title: string;
  position: UniqueIdentifier;
}

export default function SortableItem({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.position,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 border p-2 m-2 bg-background rounded-lg hover:bg-secondary"
    >
      <GripVertical />
      {item.title}
    </div>
  );
}
