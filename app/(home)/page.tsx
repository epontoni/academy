import { Typewriter } from "@/components/Typewriter";
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
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import DOMPurify from "isomorphic-dompurify";
import { BookOpen, Calendar, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const courses = await getCourses();
  return (
    <div>
      <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
        <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
          <Image src="/hero.png" fill alt="Sherpa help you to learn" />
        </div>
        <div className="flex flex-col items-center gap-y-8 flex-1">
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center min-h-[60px] lg:min-h-[85px]">
            {" "}
            {/** Check the min-h-[60px] lg:min-h-[85px]  */}
            Excell your skills. Develops{" "}
            <Typewriter
              words={[
                "Mathematical thinking.",
                "Computational thinking.",
                "Critical thinking.",
                "Creative thinking.",
                "Scientific thinking.",
                "Strategic thinking.",
                "Analytical thinking.",
              ]}
              className=""
            />
          </h1>
          <div className="flex flex-col items-center gap-y-3">
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton mode="modal" fallbackRedirectUrl="/courses">
                  <Button size="lg" variant="secondary" className="w-full">
                    Get Started
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal" fallbackRedirectUrl="/courses">
                  <Button size="lg" variant="outline" className="w-full">
                    I already have an account
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full"
                  asChild
                >
                  <Link href="/courses">Continue learning</Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </div>
      {/* <h1 className="font-bold">Home</h1>
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
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(course.description),
                    }}
                  />
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
      </div> */}
    </div>
  );
}
