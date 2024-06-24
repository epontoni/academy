import ResourceForm from "@/components/resource-form";
import ResourceList from "@/components/resource-list";

export default function CreateResourcePage({
  params,
}: {
  params: { lessonId: string };
}) {
  return (
    <>
      <ResourceList lessonId={params.lessonId} />
      <ResourceForm lessonId={params.lessonId} />
    </>
  );
}
