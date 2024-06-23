"use client";

import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Item {
  _id: string;
  title: string;
  isPublished: boolean;
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
      <div className="flex items-center gap-4 ml-auto">
        <Badge
          className="ml-auto"
          variant={item.isPublished ? "default" : "secondary"}
        >
          {item.isPublished ? "Published" : "Unpublished"}
        </Badge>
        <Pencil
          className="ml-auto h-4 w-4 hover:text-primary"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
