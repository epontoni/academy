import { Schema, model, models } from "mongoose";
import { ICategory } from "./category.model";

export interface ICourse extends Document {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  price: string;
  isPublished: Boolean;
  category: ICategory;
  instructorId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructorId: { type: Schema.Types.ObjectId, ref: "User" },
    imageUrl: { type: String },
    price: { type: Number },
    isPublished: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const Course = models.Course || model("Course", CourseSchema);

export default Course;
