export default function CreateLessonPage({
  params,
}: {
  params: { unitId: string };
}) {
  return <div>Create Lesson Page for unitId: {params.unitId}</div>;
}
