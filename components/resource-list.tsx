import { getResourcesByLessonId } from "@/lib/database/actions/attachment.action";
import { IAttachment } from "@/lib/database/models/attachment.model";
import { File, Pencil, Trash } from "lucide-react";

export default async function ResourceList({ lessonId }: { lessonId: string }) {
  const resources = await getResourcesByLessonId(lessonId);

  if (resources) {
    return (
      <div>
        {resources.map((item: IAttachment) => {
          return (
            <div className="flex items-center justify-between border rounded-md mb-2 p-2">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4 hover:text-primary" />
                <a href={item.resourceUrl} target="_blank">
                  {item.resourceName}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Pencil className="h-4 w-4 hover:text-primary" />
                <Trash className="h-4 w-4 hover:text-primary" />
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>No se encontraron recursos para esta lección</div>;
  }
}
