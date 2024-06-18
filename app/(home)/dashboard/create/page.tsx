import { CourseForm } from "@/components/course-form";
import { auth } from "@clerk/nextjs/server";

export default function CreateNewCooursePage() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata?.userId as string;
  return (
    <div>
      <h1 className="font-bold">Create new course</h1>
      <CourseForm userId={userId as string} type="Create" />
    </div>
  );
}
