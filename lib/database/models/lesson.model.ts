import { Schema, model, models } from "mongoose";
import { IUnit } from "./unit.model";
import { IAttachment } from "./attachment.models";

export interface ILesson extends Document {
  _id: string;

  title: string;
  description: string;
  uniteId: IUnit;
  atachments: IAttachment[];

  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    unitId: { type: Schema.Types.ObjectId, ref: "Unit" },
    attachments: [
      {
        attachmentId: { type: Schema.Types.ObjectId, ref: "Attachment" },
      },
    ],
  },
  { timestamps: true }
);

const Lesson = models.Lesson || model("Lesson", LessonSchema);

export default Lesson;
