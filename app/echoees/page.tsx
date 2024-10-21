"use client";

import { useFetchListArtistsQuery } from "@/redux/features/artistApiSlice";
import EchoeeCard from "./components/echoee-card";
import EchoeeGroup from "./components/echoee-group";
import { Skeleton } from "@nextui-org/skeleton";
import { Spacer } from "@nextui-org/spacer";
import { SearchInput } from "./components/search-input";

export default function EchoeesPage() {
  const { data, isLoading } = useFetchListArtistsQuery();
  if(isLoading){
   return <div>
    <CustomSkeleton />
    <Spacer y={10}/>
    <CustomSkeleton />
    <Spacer y={10}/>
    <CustomSkeleton />
   </div>
  }
  return <div>
        <SearchInput />
        <h1 className="mb-4 text-2xl font-bold">Top Echoees</h1>
    {data && <EchoeeGroup echoeeList={data} />}</div>;
}

const CustomSkeleton = () => {
    return <div className="flex overflow-x-hidden gap-2">
        <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg">

        </Skeleton>
        <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg ">

        </Skeleton>
        <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg">

        </Skeleton>
        <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg">

        </Skeleton>
        <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg">

        </Skeleton>
        <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg">

        </Skeleton>
        <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg">

        </Skeleton>

    </div>
}
