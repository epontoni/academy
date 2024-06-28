import { LessonForm } from "@/components/lesson-form";
import ResourceForm from "@/components/resource-form";

export default function CreateLessonPage({
  params,
}: {
  params: { unitId: string };
}) {
  return (
    <div>
      Create Lesson Page for unitId: {params.unitId}
      <LessonForm type="Create" unitId={params.unitId} />
    </div>
  );
}
