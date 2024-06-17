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
                <CardDescription>{course.description}</CardDescription>
              </CardContent>
              <CardFooter>
                {formatDateTime(course.createdAt).dateTime}
              </CardFooter>
            </Card>
          ))}
        {courses?.length == 0 && <h2>No se encontraron cursos</h2>}
      </div>
    </div>
  );
}
