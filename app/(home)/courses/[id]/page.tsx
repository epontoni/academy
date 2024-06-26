import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCourseById } from "@/lib/database/actions/course.actions";
import { BookOpen, CirclePlay } from "lucide-react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { getUnitsByCourseId } from "@/lib/database/actions/unit.actions";

type GetCourseProps = {
  params: {
    id: string;
  };
};
export default async function ({ params: { id } }: GetCourseProps) {
  console.log("\n\n\n*** COURSE ID", id);
  const course = await getCourseById(id);
  const { units, unitsCount } = await getUnitsByCourseId(id);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Image
        src={course.imageUrl}
        width={1000}
        height={1000}
        alt={course.title}
        className="h-full min-h-[300px] object-cover object-center"
      />
      <div className="border p-4 rounded-xl w-full">
        <Badge>
          <BookOpen className="mr-2" />{" "}
          {unitsCount === 1 ? `${unitsCount} Unit` : `${unitsCount} Units`}
        </Badge>
        <h1 className="font-bold text-2xl">{course.title}</h1>
        <div
          className="text-foreground"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(course.description),
          }}
        />
        <Badge variant="secondary">{course.category.name}</Badge>
        <Progress value={33} className="mt-2" />
        <h3 className="text-sm mb-2">33% Complete</h3>
        <Button className="flex gap-2">
          <CirclePlay /> Continue watching
        </Button>
      </div>
    </div>
  );
}
