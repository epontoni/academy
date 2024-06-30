"use server";

import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import Lesson, { ILesson } from "@/lib/database/models/lesson.model";
import { revalidatePath } from "next/cache";
import Attachment, {
  IAttachment,
} from "@/lib/database/models/attachment.model";
import mongoose from "mongoose";

type CreateLessonParams = {
  title: string;
  description: string;
  media: string;
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

export async function getLessonsById(lessonId: string) {
  try {
    // const course = await populateCourse(Course.findById(id));
    const lesson = await populateLesson(Lesson.findOne({ _id: lessonId }));

    return JSON.parse(JSON.stringify(lesson));
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

type UpdateLessonParams = {
  lesson: {
    _id: string;
    title: string;
    description: string;
    media: string;
    isPublished: boolean;
    // attachments: { resourceName: string; resourceUrl: string }[] | [];
  };
  path: string;
};

// UPDATE LESSON
export async function updateLesson({ lesson, path }: UpdateLessonParams) {
  try {
    await connectToDatabase();

    const lessonToUpdate = await Lesson.findById(lesson._id);
    if (!lessonToUpdate) {
      throw new Error("Unauthorized or Lesson not found"); // TODO: Check the autorization
    }

    // attachments
    // const attachments = lesson.attachments;

    // attachments.forEach((resource) => {
    //   // update attachment file.
    // });

    const updatedLesson = await Lesson.findByIdAndUpdate(
      lesson._id,
      { ...lesson },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedLesson));
  } catch (error) {
    handleError(error);
  }
}

// Add attachment's lesson
export async function addAttachments(
  lessonId: string,
  attachments: IAttachment[] // Check
) {
  try {
    await connectToDatabase();

    const lessonToUpdate = await Lesson.findById(lessonId);
    if (!lessonToUpdate) {
      throw new Error("Unauthorized or Lesson not found"); // TODO: Check the autorization
    }

    const ResourceIds: mongoose.Types.ObjectId[] = [];

    attachments.forEach((resource) => {
      ResourceIds.push(new mongoose.Types.ObjectId(resource._id));
    });

    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { attachments: [...lessonToUpdate.attachments, ...ResourceIds] },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedLesson));
  } catch (error) {
    handleError(error);
  }
}
