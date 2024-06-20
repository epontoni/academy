import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCourses } from "@/lib/database/actions/course.actions";
import { ICourse } from "@/lib/database/models/course.model";
import { formatDateTime } from "@/lib/utils";
import { BookOpen, Calendar } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const courses = await getCourses();
  return (
    <div>
      <h1 className="font-bold">Home</h1>
      <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.length >= 1 &&
          courses.map((course: ICourse) => (
            <Card>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-5 text-primary" />
                    {formatDateTime(course.createdAt).dateTime}
                  </div>
                  <div>
                    <Badge>
                      <span className="flex items-center gap-2 text-xs font-normal">
                        <BookOpen className="w-5" /> {course.units.length}{" "}
                        lessons
                      </span>
                    </Badge>
                  </div>
                  {course.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button asChild>
                  <Link href={`/courses/${course._id}`}>Ver curso</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        {courses?.length == 0 && <h2>No se encontraron cursos</h2>}
      </div>
    </div>
  );
}
