import { Skeleton } from "@nextui-org/skeleton";
import { Spacer } from "@nextui-org/spacer";

export default function FormSkeleton() {
  return (
    <div className="w-full space-y-4 p-6 rounded-lg md:w-2/4 h-4/6 bg-white/5">
      <Skeleton className="rounded-md">
        <div className="h-10 " />
      </Skeleton>
      <Skeleton className="rounded-md w-1/4">
        <div className="h-4 " />
      </Skeleton>
      <Skeleton className="rounded-md">
        <div className="h-10 " />
      </Skeleton>
      <Skeleton className="rounded-md w-1/4">
        <div className="h-4 " />
      </Skeleton>
      <Skeleton className="rounded-md">
        <div className="h-10 " />
      </Skeleton>
      <div className="flex">
        <Skeleton className="rounded-md w-1/4">
          <div className="h-10 " />
        </Skeleton>
        <Spacer x={4} />
        <Skeleton className="rounded-md w-1/4">
          <div className="h-10 " />
        </Skeleton>
      </div>
    </div>
  );
}
