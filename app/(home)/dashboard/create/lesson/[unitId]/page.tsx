import { LessonForm } from "@/components/lesson-form";
// import ResourceForm from "@/components/resource-form";
import { getUnitById } from "@/lib/database/actions/unit.actions";

export default async function CreateLessonPage({
  params,
}: {
  params: { unitId: string };
}) {
  const unit = await getUnitById(params.unitId);
  const courseId = unit.courseId;

  return (
    <div>
      Create Lesson Page for unitId: {params.unitId}
      <LessonForm type="Create" courseId={courseId} unitId={params.unitId} />
    </div>
  );
}
