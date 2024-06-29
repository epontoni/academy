"use client";

import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

interface Item {
  _id: string;
  title: string;
  isPublished: boolean;
  position: UniqueIdentifier;
}

export default function SortableItem({
  item,
  courseId,
  unitId,
  type,
}: {
  item: Item;
  courseId: string;
  unitId?: string;
  type: "Unit" | "Lesson";
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.position,
    });

  const router = useRouter();

  const editPath =
    type === "Unit"
      ? `/dashboard/edit/${courseId}/curriculum/${item._id}`
      : `/dashboard/edit/${courseId}/curriculum/${unitId}/lessons/${item._id}`;

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
          className="ml-auto hover:bg-muted-foreground"
          variant={item.isPublished ? "default" : "secondary"}
        >
          {item.isPublished ? "Published" : "Unpublished"}
        </Badge>
        <Button asChild variant="ghost">
          <Link href={editPath}>
            <Pencil className="ml-auto h-4 w-4 hover:text-primary" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
