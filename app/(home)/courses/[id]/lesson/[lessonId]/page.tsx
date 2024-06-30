import {
  getLessonsById,
  getLessonsByUnitId,
} from "@/lib/database/actions/lesson.actions";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Badge,
  BadgeCheck,
  CircleArrowRight,
  Link as LinkIcon,
} from "lucide-react";
import { getResourcesByLessonId } from "@/lib/database/actions/attachment.action";
import { IAttachment } from "@/lib/database/models/attachment.model";
import { getUnitsByCourseId } from "@/lib/database/actions/unit.actions";
import { IUnit } from "@/lib/database/models/unit.model";
import Link from "next/link";
import ClassItem from "@/components/class-item";
import { ILesson } from "@/lib/database/models/lesson.model";

export default async function LessonPage({
  params,
}: {
  params: { id: string; lessonId: string };
}) {
  const { units } = await getUnitsByCourseId(params.id);
  const lesson = await getLessonsById(params.lessonId);
  const resources = await getResourcesByLessonId(params.lessonId);

  if (!units || !lesson) {
    redirect(`/courses/${params.id}`);
  }
  return (
    <div>
      <div className="grid md:grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <div className="flex justify-between items-center my-2">
            <h1 className="font-bold text-xl truncate">{lesson.title}</h1>
            <p>Clase 1 / 12</p>
            <Button variant="secondary" className="flex items-center gap-2">
              Siguiente clase <CircleArrowRight />
            </Button>
          </div>

          <div className="relative pb-16/9">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={lesson.media}
              title="YouTube video"
              allowFullScreen
            ></iframe>
            {lesson.media}
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <Tabs defaultValue="lessons">
            <TabsList className="w-full">
              <TabsTrigger value="summary">Sumario</TabsTrigger>
              <TabsTrigger value="lessons">Clases</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <h2 className="font-bold">{lesson.title}</h2>
              <p className="text-xs text-muted-foreground">
                Published: {formatDateTime(lesson.createdAt).dateTime}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(lesson.description),
                }}
              />
            </TabsContent>
            <TabsContent value="lessons">
              <Accordion type="single" collapsible>
                {units &&
                  units.map((u: IUnit) => {
                    return (
                      <AccordionItem value={u._id}>
                        <AccordionTrigger>{u.title}</AccordionTrigger>
                        <AccordionContent>
                          {u.lessons.map((lesson: Partial<ILesson>) => {
                            return (
                              <ClassItem courseId={params.id} lesson={lesson} />
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
              </Accordion>
            </TabsContent>
            <TabsContent value="resources">
              {!resources && (
                <p>Esta lección no cuenta con recursos.{resources}</p>
              )}
              {resources.map((resource: IAttachment) => {
                return (
                  <Button asChild variant="link">
                    <div className="flex gap-2 items-center">
                      <LinkIcon className="h-4 w-4" />
                      <a href={resource.resourceUrl} target="_blank">
                        {resource.resourceName}
                      </a>
                    </div>
                  </Button>
                );
              })}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
