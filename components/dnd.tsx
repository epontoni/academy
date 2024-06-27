"use client";
import { useEffect, useRef, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/sortable-item";
import { IUnit } from "@/lib/database/models/unit.model";
import { reorderUnits } from "@/lib/database/actions/unit.actions";
import { toast } from "sonner";

export default function DragAndDrop({
  elements,
  courseId,
}: {
  elements: IUnit[];
  courseId: string;
}) {
  const [items, setItems] = useState(
    elements.sort((a, b) => a.position - b.position) || []
  );

  const isFirstRender = useRef(true);

  const saveData = async () => {
    const result = await reorderUnits(items, courseId);

    if (result) {
      toast.success("Reordenado exitoso");
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    saveData();
  }, [items]);

  const handleDragEnd = async (event: { active: any; over: any }) => {
    const { active, over } = event;

    setItems((prevItems) => {
      const oldIndex = prevItems.findIndex(
        (item) => item.position === active.id
      );
      const newIndex = prevItems.findIndex((item) => item.position === over.id);

      return arrayMove(prevItems, oldIndex, newIndex);
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <h1 className="font-bold">Units</h1>
      <SortableContext
        items={items.map((i) => i.position)} // This "rename" the id to position
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, index) => (
          <SortableItem key={index} item={item} courseId={courseId} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
