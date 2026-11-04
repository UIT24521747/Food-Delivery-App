import { Skeleton } from "@/components/ui/skeleton";

export default function RestaurantLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-72 w-full rounded-3xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-80 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
