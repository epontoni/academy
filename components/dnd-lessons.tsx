"use client";
import { useEffect, useRef, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/sortable-item";
import { toast } from "sonner";
import { ILesson } from "@/lib/database/models/lesson.model";
import { reorderLessons } from "@/lib/database/actions/lesson.actions";

export default function DragAndDropLessons({
  elements,
  courseId,
  unitId,
}: {
  elements: ILesson[];
  courseId: string;
  unitId: string;
}) {
  const [items, setItems] = useState(
    elements.sort((a, b) => a.position - b.position) || []
  );

  const isFirstRender = useRef(true);

  const saveData = async () => {
    const result = await reorderLessons(items, courseId, unitId);

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
      <SortableContext
        items={items.map((i) => i.position)} // This "rename" the id to position
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, index) => (
          <SortableItem
            key={index}
            item={item}
            courseId={courseId}
            unitId={unitId}
            type="Lesson"
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
