import DragAndDropLessons from "@/components/dnd-lessons";
import { getLessonsByUnitId } from "@/lib/database/actions/lesson.actions";
import { ILesson } from "@/lib/database/models/lesson.model";

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
        {lessons && (
          <DragAndDropLessons
            elements={lessons}
            courseId={params.id}
            unitId={params.unitId}
          />
        )}
      </div>
      {/* <div>
        {lessons.map((lesson: ILesson) => (
          <div key={lesson._id}>{lesson.title}</div>
        ))}
      </div> */}
    </>
  );
}
