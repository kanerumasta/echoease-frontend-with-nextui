import { Skeleton } from "@nextui-org/skeleton";

export const CustomSkeleton = () => {
  return (
    <div className="flex overflow-x-hidden gap-2">
      <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
      <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg " />
      <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
      <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
      <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
      <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
      <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
    </div>
  );
};
