import SearchBar from "@/components/search-bar";

export default function CoursesPage() {
  return (
    <div>
      <h1 className="font-bold">Courses</h1>
      <div className="sm:hidden">
        <SearchBar />
      </div>
    </div>
  );
}
