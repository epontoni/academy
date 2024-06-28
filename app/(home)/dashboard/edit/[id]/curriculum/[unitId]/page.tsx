import { Button } from "@/components/ui/button";
import { UnitForm } from "@/components/unit-form";
import { getUnitById } from "@/lib/database/actions/unit.actions";
import Link from "next/link";

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
      <UnitForm
        type="Update"
        courseId={params.id}
        unit={unit}
        unitId={params.unitId}
      />
    </>
  );
}
