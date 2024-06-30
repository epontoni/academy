"use server";

import { connectToDatabase } from "@/lib/database";
import Unit, { IUnit } from "@/lib/database/models/unit.model";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Lesson from "../models/lesson.model";

type CreateUnitParams = {
  title: string;
  description: string;
  isPublished: boolean;
  courseId: string;
};

const populateUnit = async (query: any) => {
  return query.populate({
    path: "lessons",
    model: Lesson,
    select: "_id title isCompleted position",
  });
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

    revalidatePath(`/dashboard/edit/${unit.courseId}/curriculum`);

    return JSON.parse(JSON.stringify(newUnit));
  } catch (error) {
    handleError(error);
  }
}

export async function getUnitsByCourseId(courseId: string) {
  try {
    await connectToDatabase();

    const units = await populateUnit(
      Unit.find({ courseId: courseId }).sort({
        position: -1,
      })
    );

    const unitsCount = await Unit.countDocuments({ courseId: courseId });

    return JSON.parse(JSON.stringify({ units, unitsCount }));
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

export async function getUnitById(unitId: string) {
  try {
    await connectToDatabase();

    const unit = await Unit.findOne({ _id: unitId });

    return JSON.parse(JSON.stringify(unit));
  } catch (error) {
    handleError(error);
  }
}

type UpdateUnitParams = {
  unit: {
    _id: string;
    title: string;
    description: string;
    isPublished: boolean;
  };
  path: string;
};

// UPDATE UNIT
export async function updateUnit({ unit, path }: UpdateUnitParams) {
  try {
    await connectToDatabase();

    // console.log(
    //   `***\n updateEvent: userId: ${userId}, event: ${event}, path: ${path}, eventToUpdate: ${eventToUpdate}, orgnizer: ${eventToUpdate.organizer.toHexString()} \n***`
    // );

    const unitToUpdate = await Unit.findById(unit._id);
    if (!unitToUpdate) {
      throw new Error("Unauthorized or Unit not found"); // TODO: Check the autorization
    }

    const updatedUnit = await Unit.findByIdAndUpdate(
      unit._id,
      { ...unit },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedUnit));
  } catch (error) {
    handleError(error);
  }
}

// SAVE LESSON ID INTO THE LESSONS ARRAY
export async function addLessonToUnit(unitId: string, lessonId: string) {
  try {
    await connectToDatabase();

    const unitToUpdate = await Unit.findById(unitId);
    if (!unitToUpdate) {
      throw new Error("Unauthorized or Unit not found"); // TODO: Check the autorization
    }

    const updatedUnit = await Unit.findByIdAndUpdate(
      unitId,
      { lessons: [...unitToUpdate.lessons, lessonId] },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedUnit));
  } catch (error) {
    handleError(error);
  }
}
