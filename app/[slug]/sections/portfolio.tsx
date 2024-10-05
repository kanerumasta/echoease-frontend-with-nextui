"use client";

import { useFetchPortfolioQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { z } from "zod";
import { MediaGrid } from "../components/media-grid";

export const PortfolioSection = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const { data } = useFetchPortfolioQuery(artist.id.toString());

  return (
    <div className="flex flex-col min-h-screen lg:flex-row md:px-20 gap-4">
      {data?.items.map((item) => {
        const mediaUrls = [...item.images, ...item.videos];
        return (
          <div key={item.id} className=" w-full ">
            <p className="text-lg mb-3 font-bold capitalize">{item.title}</p>
            <MediaGrid mediaUrls={mediaUrls} maxVisible={4} />
          </div>
        );
      })}
    </div>
  );
};
