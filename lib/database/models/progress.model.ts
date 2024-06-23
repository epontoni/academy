import { Schema, model, models } from "mongoose";

export interface IProgress extends Document {
  _id: string;

  studentId: string;
  courseId: string;
  isCompleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Progress = models.Progress || model("Progress", ProgressSchema);

export default Progress;
