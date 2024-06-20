import { ICourse } from "@/lib/database/models/course.model";
import Card from "@/components/card";
import Pagination from "@/components/pagination";

type CollectionProps = {
  data: ICourse[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?:
    | "Events_Organized"
    | "My_Tickets"
    | "All_Events"
    | "All_Classifications";
};
export default function Collection({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  limit,
  urlParamName,
}: CollectionProps) {
  const arr = new Array(totalPages);
  return (
    <div>
      {data?.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((course) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={course._id} className="flex justify-center">
                  <Card
                    course={course}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center max-w-7xl lg:mx-auto p-5 md:px-5 xl:px-0 w-full min-h-[100px] flex-col gap-3 rounded-md bg-gray-100 py-28 text-center">
          <h3 className="font-bold text-[24px] leading-[36px] md:text-[28px] text-primary">
            {emptyTitle}
          </h3>
          <p className="font-normal text-[20px] leading-[36px] md:text-[24px] text-primary-foreground">
            {emptyStateSubtext}
          </p>
        </div>
      )}
    </div>
  );
}
