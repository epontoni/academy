import { connectToDatabase } from "@/lib/database";
import Unit from "@/lib/database/models/unit.model";
import { handleError } from "@/lib/utils";

type CreateUnitParams = {
  title: string;
  description: string;
  courseId: string;
};

export async function createUnit(unit: CreateUnitParams) {
  try {
    await connectToDatabase();

    const lastUnit = await Unit.findOne({ courseId: unit.courseId }).sort({
      position: -1,
    });

    const newPosition = lastUnit ? lastUnit.position + 1 : 0;

    const newUnit = await Unit.create({
      ...unit,
      position: newPosition,
    });
    return JSON.parse(JSON.stringify(newUnit));
  } catch (error) {
    handleError(error);
  }
}
