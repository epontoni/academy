import { Schema, model, models } from "mongoose";
import { ICourse } from "./course.model";
import { ILesson } from "./lesson.model";

export interface IUnit extends Document {
  _id: string;

  title: string;
  description: string;
  courseId: ICourse;
  lessons: ILesson[];

  createdAt: Date;
  updatedAt: Date;
}

const UnitSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    lessons: [
      {
        lessonId: { type: Schema.Types.ObjectId, ref: "Lesson" },
      },
    ],
  },
  { timestamps: true }
);

const Unit = models.Unit || model("Unit", UnitSchema);

export default Unit;
