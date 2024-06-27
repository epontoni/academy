import { UnitForm } from "@/components/unit-form";
import UnitList from "@/components/unit-list";

export default function CreateUnitPage({ params }: { params: { id: string } }) {
  return (
    <>
      {/* <UnitList courseId={params.id} /> */}
      <UnitForm type="Create" courseId={params.id} />
    </>
  );
}
