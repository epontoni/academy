"use server";

import { connectToDatabase } from "@/lib/database";

import {
  CreateCourseParams,
  DeleteCourseParams,
  GetAllCoursesParams,
  UpdateCourseParams,
} from "@/types";
import Course from "@/lib/database/models/course.model";
import { handleError } from "@/lib/utils";
import Category from "@/lib/database/models/category.model";
import User from "@/lib/database/models/user.model";
import { revalidatePath } from "next/cache";
import Unit from "@/lib/database/models/unit.model";
import Progress from "@/lib/database/models/progress.model";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: `^${name}$`, $options: "i" } }); // name -> `^${name}$` para devolver los documentos que coincidan exactamente con el nombre proporcionado
};

const populateCourse = async (query: any) => {
  return query
    .populate({
      path: "instructor",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
  // Comment this if break the app
  // .populate({
  //   path: "units",
  //   model: Unit,
  //   select: "_id title description position isPublished lessons",
  // })
  // .populate({
  //   path: "progress",
  //   model: Progress,
  //   select:
  //     "_id studentId courseId totalLessons completedLessons percentage lastLesson isCompleted createdAt updatedAt",
  // })
};

export async function createCourse(course: CreateCourseParams) {
  try {
    await connectToDatabase();

    const newCourse = await Course.create(course);
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    handleError(error);
  }
}

export async function getCourseById(id: string) {
  try {
    const course = await populateCourse(Course.findById(id));

    if (!course) {
      throw new Error("Course not found");
    }
    return JSON.parse(JSON.stringify(course));
  } catch (e) {
    handleError(e);
  }
}

export async function getCourses() {
  try {
    await connectToDatabase();

    const courses = await Course.find();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateCourse({
  userId,
  course,
  path,
}: UpdateCourseParams) {
  try {
    await connectToDatabase();

    const courseToUpdate = await Course.findById(course._id);

    if (!courseToUpdate || courseToUpdate.instructor.toHexString() !== userId) {
      throw new Error("Unauthorized or course not found");
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      course._id,
      { ...course },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedCourse));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteEvent({ courseId, path }: DeleteCourseParams) {
  try {
    await connectToDatabase();

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (deletedCourse) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL PUBLISHED WITH PAGINATION
export const getAllPublishedCourses = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllCoursesParams) => {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;

    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
        { isPublished: true },
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;

    const courseQuery = Course.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const courses = await populateCourse(courseQuery);
    const coursesCount = await Course.countDocuments(conditions);

    // if(!events) {
    //     throw new Error("Event not found");
    // }

    return {
      data: JSON.parse(JSON.stringify(courses)),
      totalPages: Math.ceil(coursesCount / limit),
      coursesCount,
    };
  } catch (error) {
    handleError(error);
  }
};

// GET ALL COURSES WITH PAGINATION
export const getAllCourses = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllCoursesParams) => {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;

    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;

    const courseQuery = Course.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const courses = await populateCourse(courseQuery);
    const coursesCount = await Course.countDocuments(conditions);

    // if(!events) {
    //     throw new Error("Event not found");
    // }

    return {
      data: JSON.parse(JSON.stringify(courses)),
      totalPages: Math.ceil(coursesCount / limit),
      coursesCount,
    };
  } catch (error) {
    handleError(error);
  }
};
