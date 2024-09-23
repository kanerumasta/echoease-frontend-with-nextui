"use client";
import useLoginRequired from "@/hooks/use-login-required";
import { useFetchListArtistsQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";
import { redirect, useRouter } from "next/navigation";
import { z } from "zod";
import { Skeleton } from "@nextui-org/skeleton";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function SearchArtistsPage() {
  const {
    data: allArtists,
    isLoading: isArtistsLoading,
    isError: isArtistsError,
  } = useFetchListArtistsQuery();

  const [isVisibleOne, setIsVisibleOne] = useState(false);
  const [isVisibleTwo, setIsVisibleTwo] = useState(false);

  const { isUserLoading } = useLoginRequired("/search/echoees");
  const { ref: refOne, inView: inViewOne } = useInView({ threshold: 1 });
  const { ref: refTwo, inView: inViewTwo } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inViewOne) {
      setIsVisibleOne(true);
    }
    if (inViewTwo) {
      setIsVisibleTwo(true);
    }
  }, [inViewOne, inViewTwo]);

  return (
    <div>
      {isArtistsLoading && (
        <div>
          <LoadingSkeleton />
          <Spacer y={4} />
          <LoadingSkeleton />
          <Spacer y={4} />
          <LoadingSkeleton />
        </div>
      )}
      {allArtists && (
        <div>
          <SingerCarousel groupTitle="Top Singers" artistList={allArtists} />
          <Spacer y={8} />
          <SingerCarousel groupTitle="Rising Artists" artistList={allArtists} />
          <Spacer y={8} />
          <div className=" min-h-[200px]" ref={refOne}>
            {isVisibleOne && (
              <SingerCarousel
                groupTitle="Basta Singers"
                artistList={allArtists}
              />
            )}
          </div>
          <Spacer y={8} />
          <div className=" min-h-[200px]" ref={refTwo}>
            {isVisibleTwo && (
              <SingerCarousel groupTitle="Mahalons" artistList={allArtists} />
            )}
          </div>
          <Spacer y={8} />
        </div>
      )}
    </div>
  );
}

const SingerCarousel = ({
  artistList,
  groupTitle,
}: {
  artistList: z.infer<typeof ArtistInSchema>[];
  groupTitle: string;
}) => {
  return (
    <div>
      <h1 className="font-bold capitalize text-2xl my-4">{groupTitle}</h1>
      <div className="w-full overflow-y-scroll no-scrollbar">
        <div className="flex gap-4 ">
          {artistList.map((artist) => (
            <>
              <ArtistCard artist={artist} />
              <ArtistCard artist={artist} />
              <ArtistCard artist={artist} />
              <ArtistCard artist={artist} />
              <ArtistCard artist={artist} />
              <ArtistCard artist={artist} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArtistCard = ({ artist }: { artist: z.infer<typeof ArtistInSchema> }) => {
  const router = useRouter();
  return (
    <Card
      isFooterBlurred
      className="min-w-[250px] duration-1000 animate-appearance-in h-[300px] col-span-12 sm:col-span-5"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 hover:scale-95 w-full h-full scale-125 -translate-y-6 object-cover"
        src={`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`}
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-white capitalize font-bold">
            {artist.user.fullname}
          </p>
          <p className="text-black text-tiny">singer</p>
        </div>
        <Button
          onClick={() => router.push(`/${artist.slug}`)}
          className="text-tiny"
          color="primary"
          radius="full"
          size="sm"
        >
          See Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <div className="flex gap-4">
    {Array.from({ length: 4 }).map((_, index) => (
      <Card key={index} className="w-full min-h-[300px] p-4">
        <Skeleton className="rounded-lg">
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3 mt-4">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    ))}
  </div>
);
