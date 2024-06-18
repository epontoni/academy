import { Schema, model, models } from "mongoose";
import { ICategory } from "./category.model";
import { IUnit } from "./unit.model";

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
  isPublished: Boolean;
  category: ICategory;
  units: IUnit[];

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
  },
  { timestamps: true }
);

const Course = models.Course || model("Course", CourseSchema);

export default Course;
