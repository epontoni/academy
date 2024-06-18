"use server";

import { connectToDatabase } from "@/lib/database";
import { CreateCourseParams } from "@/types";
import Course from "@/lib/database/models/course.model";
import { handleError } from "@/lib/utils";
import Category from "@/lib/database/models/category.model";
import User from "@/lib/database/models/user.model";

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
