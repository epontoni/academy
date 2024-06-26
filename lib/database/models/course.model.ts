import { Schema, model, models } from "mongoose";
import { ICategory } from "@/lib/database/models/category.model";
import { IUnit } from "@/lib/database/models/unit.model";
import { IProgress } from "./progress.model";

export interface ICourse extends Document {
  _id: string;

  title: string;
  description: string;
  instructor: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  imageUrl: string;
  isPublished: boolean;
  category: ICategory;
  units: IUnit[];
  progress: IProgress;

  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    imageUrl: { type: String },
    isPublished: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    units: [
      {
        unitId: { type: Schema.Types.ObjectId, ref: "Unit" },
      },
    ],
    progress: { type: Schema.Types.ObjectId, ref: "Progress" },
  },
  { timestamps: true }
);

const Course = models.Course || model("Course", CourseSchema);

export default Course;
