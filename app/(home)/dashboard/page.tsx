import CategoryFilter from "@/components/category-filter";
import Collection from "@/components/collection";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/lib/database/actions/course.actions";
import { SearchParamProps } from "@/types";
import Link from "next/link";

type GetCourseProps = {
  params: {
    id: string;
  };
};

export default async function DashboardPage({
  searchParams,
}: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  // TODO pass the userId (instructor)
  const courses = await getAllCourses({
    query: searchText,
    limit: 6,
    page: page,
    category: category,
  });

  return (
    <div>
      <h1 className="font-bold">Dashboard</h1>
      <Button asChild>
        <Link href="/dashboard/create">Create new course</Link>
      </Button>

      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <Search />
        <CategoryFilter />
      </div>

      <Collection
        data={courses?.data}
        emptyTitle="No se encontraron cursos"
        emptyStateSubtext="¡Crea un nuevo curso!"
        collectionType="All_Events"
        limit={6}
        page={page}
        totalPages={courses?.totalPages}
      />
    </div>
  );
}
