import { Schema, model, models } from "mongoose";
import { IUnit } from "@/lib/database/models/unit.model";
import { IAttachment } from "@/lib/database/models/attachment.model";

export interface ILesson extends Document {
  _id: string;

  title: string;
  description: string;
  position: number;
  uniteId: IUnit;
  atachments: IAttachment[];

  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: Number },
    isPublished: { type: Boolean, default: false },
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
