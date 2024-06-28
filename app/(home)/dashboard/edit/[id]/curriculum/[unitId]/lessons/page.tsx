import DragAndDropLessons from "@/components/dnd-lessons";
import { Button } from "@/components/ui/button";
import { getLessonsByUnitId } from "@/lib/database/actions/lesson.actions";
import { ILesson } from "@/lib/database/models/lesson.model";
import Link from "next/link";

export default async function LessonsPage({
  params,
}: {
  params: { id: string; unitId: string };
}) {
  const lessons = await getLessonsByUnitId(params.unitId);
  return (
    <>
      <div>
        <h2 className="font-bold text-xl">Lessons</h2>
        {lessons?.length >= 1 && (
          <DragAndDropLessons
            elements={lessons}
            courseId={params.id}
            unitId={params.unitId}
          />
        )}

        {!lessons ||
          (lessons?.length == 0 && (
            <div>
              No hay lecciones para esta unidad.{" "}
              <Button asChild variant="link">
                <Link href={`/dashboard/create/lesson/${params.unitId}`}>
                  Crea una nueva lección
                </Link>
              </Button>
            </div>
          ))}
      </div>
      {/* <div>
        {lessons.map((lesson: ILesson) => (
          <div key={lesson._id}>{lesson.title}</div>
        ))}
      </div> */}
    </>
  );
}
