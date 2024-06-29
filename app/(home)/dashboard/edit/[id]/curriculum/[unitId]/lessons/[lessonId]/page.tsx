import { LessonForm } from "@/components/lesson-form";
import { getLessonsById } from "@/lib/database/actions/lesson.actions";

export default async function EditLessonPage({
  params,
}: {
  params: { id: string; unitId: string; lessonId: string };
}) {
  const lesson = await getLessonsById(params.lessonId);
  return (
    <div>
      Edit lesson page for lesson: {params.lessonId}
      lESSON: {JSON.stringify(lesson)}
      <LessonForm
        type="Update"
        courseId={params.id}
        unitId={lesson.unitId}
        lesson={lesson}
        lessonId={lesson._id}
      />
    </div>
  );
}
