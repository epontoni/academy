"use client";

import { ILesson } from "@/lib/database/models/lesson.model";
import { Badge, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClassItem({
  courseId,
  lesson,
}: {
  courseId: string;
  lesson: Partial<ILesson>;
}) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {lesson.isCompleted ? <BadgeCheck /> : <Badge />}
      <Link
        href={`/courses/${courseId}/lesson/${lesson._id}`}
        className={
          pathname === `/courses/${courseId}/lesson/${lesson._id}`
            ? "text-primary"
            : ""
        }
      >
        {lesson.title}
      </Link>
    </div>
  );
}
