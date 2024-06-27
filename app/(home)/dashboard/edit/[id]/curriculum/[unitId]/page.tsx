import { UnitForm } from "@/components/unit-form";
import { getUnitById } from "@/lib/database/actions/unit.actions";

export default async function EditUnitPage({
  params,
}: {
  params: { id: string; unitId: string };
}) {
  const loadUnit = async (unitId: string) => {
    return await getUnitById(unitId);
  };

  let unit;
  if (params.unitId) {
    unit = await loadUnit(params.unitId);
  }

  return (
    <>
      {`Edit unit ${params.unitId}`}
      <UnitForm
        type="Update"
        courseId={params.id}
        unit={unit}
        unitId={params.unitId}
      />
    </>
  );
}
