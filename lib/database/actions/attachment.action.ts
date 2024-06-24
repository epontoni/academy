"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/database";
import Attachment from "@/lib/database/models/attachment.model";

interface CreateResourceParams {
  attachments: { resourceName: string; resourceUrl: string }[];
  lessonId: string;
}

export const createResource = async ({
  attachments,
  lessonId,
}: CreateResourceParams) => {
  try {
    await connectToDatabase();

    for (let resource of attachments) {
      const newResource = await Attachment.create({
        resourceName: resource.resourceName,
        resourceUrl: resource.resourceUrl,
        lessonId: lessonId,
      });
    }

    return JSON.parse(JSON.stringify({ status: true }));
  } catch (error) {
    handleError(error);
  }
};

export const getResourcesByLessonId = async (lessonId: string) => {
  try {
    await connectToDatabase();

    const attachments = await Attachment.find({ lessonId });

    return JSON.parse(JSON.stringify(attachments));
  } catch (error) {
    handleError(error);
  }
};
