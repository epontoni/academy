import { Schema, model, models } from "mongoose";

export interface IProgress extends Document {
  _id: string;

  studentId: string;
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  lastLesson: string;
  isCompleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    totalLessons: { type: Number }, // Update this field when create or delete a new lesson
    completedLessons: { type: Number }, // Update this field when a lesson is marked as complete
    percentage: { type: Number }, // ( completedLessons / totalLessons ) * 100
    lastLesson: { type: Schema.Types.ObjectId, ref: "Lesson" },
    isCompleted: { type: Boolean, default: false }, // Update this field when a lesson is marked as complete
  },
  { timestamps: true }
);

const Progress = models.Progress || model("Progress", ProgressSchema);

export default Progress;
