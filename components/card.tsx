import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { Calendar, MoveUpRight, SquarePen } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
//import EventFinished from "./event-finished";
import DeleteConfirmation from "@/components/delete-confirmation";
import { ICourse } from "@/lib/database/models/course.model";

type CardProps = {
  course: ICourse;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

export default function Card({ course, hasOrderLink, hidePrice }: CardProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata.userId as String;

  const isEventCreator = userId === course.instructor._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-lg bg-background shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/courses/${course._id}`}
        style={{ backgroundImage: `url(${course.imageUrl})` }}
        className="flex justify-center items-center flex-grow bg-background/50 bg-cover bg-center text-gray-500"
      />

      {/* IS EVENT CREATOR */}

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-lg bg-background p-2 shadow-sm transition-all">
          <Link href={`/dashboard/edit/${course._id}`}>
            <SquarePen className="w-5 h-5 text-muted-foreground hover:text-green-500" />
          </Link>
          <DeleteConfirmation courseId={course._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <Badge variant="secondary">{course.category.name}</Badge>
          </div>
        )}

        <Link href={`/courses/${course._id}`}>
          <h4 className="text-xl font-bold line-clamp-2 flex-1">
            {course.title}
          </h4>
        </Link>

        <div className="flex justify-between w-full">
          <p className="text-grey-600">
            {course.instructor.firstName} {course.instructor.lastName}
          </p>

          {hasOrderLink && (
            <Link
              href={`/dashboard/orders?eventId=${course._id}`}
              className="flex gap-2 text-indigo-400 items-center hover:text-indigo-600"
            >
              <span>Detalle de la orden</span>
              <MoveUpRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
