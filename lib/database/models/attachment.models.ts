import { Schema, model, models } from "mongoose";
import { ILesson } from "./lesson.model";

export interface IAttachment extends Document {
  _id: string;

  title: string;
  resourceUrl: string;
  lessonId: ILesson;

  createdAt: Date;
  updatedAt: Date;
}

const AttachmentSchema = new Schema(
  {
    title: { type: String, required: true },
    resourceUrl: { type: String, required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson" },
  },
  { timestamps: true }
);

const Attachment = models.Attachment || model("Attachment", AttachmentSchema);

export default Attachment;
