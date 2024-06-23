"use server";

import { connectToDatabase } from "@/lib/database";
import Unit, { IUnit } from "@/lib/database/models/unit.model";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

type CreateUnitParams = {
  title: string;
  description: string;
  isPublished: boolean;
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

export async function getUnitsByCourseId(courseId: string) {
  try {
    await connectToDatabase();

    const units = await Unit.find({ courseId: courseId }).sort({
      position: -1,
    });

    return JSON.parse(JSON.stringify(units));
  } catch (error) {
    handleError(error);
  }
}

export async function reorderUnits(items: IUnit[], courseId: string) {
  try {
    await connectToDatabase();

    // console.log("\n\n***[REORDERING UNITS]", items);

    items.forEach(async (item, index) => {
      await Unit.findOneAndUpdate({ _id: item._id }, { position: index });
    });

    revalidatePath(`/dashboard/edit/${courseId}/curriculum`);

    return JSON.parse(JSON.stringify({ status: true }));
  } catch (e) {
    handleError(e);
  }
}
