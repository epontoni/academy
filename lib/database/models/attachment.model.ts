import { Schema, model, models } from "mongoose";
import { ILesson } from "@/lib/database/models/lesson.model";

export interface IAttachment extends Document {
  _id: string;

  resourceName: string;
  resourceUrl: string;
  lessonId: ILesson;

  createdAt: Date;
  updatedAt: Date;
}

const AttachmentSchema = new Schema(
  {
    resourceName: { type: String, required: true },
    resourceUrl: { type: String, required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson" },
  },
  { timestamps: true }
);

const Attachment = models.Attachment || model("Attachment", AttachmentSchema);

export default Attachment;
