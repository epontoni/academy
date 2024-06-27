import { getUnitsByCourseId } from "@/lib/database/actions/unit.actions";
import DragAndDrop from "@/components/dnd";
import { IUnit } from "@/lib/database/models/unit.model";

export default async function UnitList({ courseId }: { courseId: string }) {
  const { units } = await getUnitsByCourseId(courseId);
  return (
    <div>{units && <DragAndDrop elements={units} courseId={courseId} />}</div>
  );
}
