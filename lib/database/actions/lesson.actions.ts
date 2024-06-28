"use server";

import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import Lesson, { ILesson } from "@/lib/database/models/lesson.model";
import { revalidatePath } from "next/cache";
import Attachment from "@/lib/database/models/attachment.model";

type CreateLessonParams = {
  title: string;
  description: string;
  isPublished: boolean;
  unitId: string;
};

const populateLesson = async (query: any) => {
  return query.populate({
    path: "attachments",
    model: Attachment,
    select: "_id resourceName resourceUrl lessonId",
  });
};

export async function createLesson(lesson: CreateLessonParams) {
  try {
    await connectToDatabase();

    const newLesson = await Lesson.create(lesson);
    return JSON.parse(JSON.stringify(newLesson));
  } catch (error) {
    handleError(error);
  }
}

export async function getLessonsByUnitId(unitId: string) {
  try {
    // const course = await populateCourse(Course.findById(id));
    const lessons = await populateLesson(Lesson.find({ unitId }));

    // if (!lessons) {
    //   throw new Error("Course not found");
    // }
    return JSON.parse(JSON.stringify(lessons));
  } catch (e) {
    handleError(e);
  }
}

export async function reorderLessons(
  items: ILesson[],
  courseId: string,
  unitId: string
) {
  try {
    await connectToDatabase();

    // console.log("\n\n***[REORDERING UNITS]", items);

    items.forEach(async (item, index) => {
      await Lesson.findOneAndUpdate({ _id: item._id }, { position: index });
    });

    revalidatePath(`/dashboard/edit/${courseId}/curriculum/${unitId}/lessons`);

    return JSON.parse(JSON.stringify({ status: true }));
  } catch (e) {
    handleError(e);
  }
}
