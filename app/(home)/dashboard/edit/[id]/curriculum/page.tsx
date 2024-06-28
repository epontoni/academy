import { Button } from "@/components/ui/button";
import { UnitForm } from "@/components/unit-form";
import UnitList from "@/components/unit-list";
import Link from "next/link";

export default async function CurriculumPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <Button asChild className="my-2 ml-auto">
        <Link href={`/dashboard/create/unit/${params.id}`}>
          Create new unit
        </Link>
      </Button>
      <h2 className="font-bold text-xl">Units</h2>
      <UnitList courseId={params.id} />
      {/* <UnitForm type="Create" courseId={params.id} /> */}
    </>
  );
}
