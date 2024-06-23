import { UnitForm } from "@/components/unit-form";

export default function CurriculumPage({ params }: { params: { id: string } }) {
  return <UnitForm type="Create" courseId={params.id} />;
}
