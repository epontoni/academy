"use server";

import { connectToDatabase } from "@/lib/database";
import { CreateCourseParams } from "@/types";
import Course from "@/lib/database/models/course.model";
import { handleError } from "@/lib/utils";

export async function createCourse(course: CreateCourseParams) {
  try {
    await connectToDatabase();

    const newCourse = await Course.create(course);
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    handleError(error);
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
