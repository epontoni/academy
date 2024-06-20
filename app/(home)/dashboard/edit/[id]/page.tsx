import { auth } from "@clerk/nextjs/server";
import { CourseForm } from "@/components/course-form";
import { getCourseById } from "@/lib/database/actions/course.actions";

type UpdateCourseProps = {
  params: {
    id: string;
  };
};

export default async function UpdateCoursePage({
  params: { id },
}: UpdateCourseProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata?.userId as string;

  const course = await getCourseById(id);
  return (
    <CourseForm
      userId={userId}
      type="Update"
      course={course}
      courseId={course._id}
    />
  );
}
