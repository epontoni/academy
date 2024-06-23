import { Schema, model, models } from "mongoose";

export interface IUnit extends Document {
  _id: string;

  title: string;
  description: string;
  position: number;
  isPublished: boolean;
  courseId: string;
  lessons: string[]; // Check

  createdAt: Date;
  updatedAt: Date;
}

const UnitSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    position: { type: Number },
    isPublished: { type: Boolean, default: false },
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
