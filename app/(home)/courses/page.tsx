import CategoryFilter from "@/components/category-filter";
import Collection from "@/components/collection";
import Search from "@/components/search";
import SearchBar from "@/components/search-bar";
import { getAllCourses } from "@/lib/database/actions/course.actions";
import { SearchParamProps } from "@/types";

export default async function CoursesPage({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const courses = await getAllCourses({
    query: searchText,
    limit: 6,
    page: page,
    category: category,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Courses</h1>
      {/* <div className="sm:hidden">
        <SearchBar />
      </div> */}
      <div className="container pt-2">
        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <Collection
          data={courses?.data}
          emptyTitle="No se encontraron cursos"
          emptyStateSubtext="Próximamente nuevos cursos!"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={courses?.totalPages}
        />
      </div>
    </div>
  );
}
