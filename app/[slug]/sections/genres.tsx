import { z } from "zod";

import { ArtistInSchema } from "@/schemas/artist-schemas";

export const Genres = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  return (
    <div className="px-8 mb-12">
      <h1 className="text-center mb-4 text-2xl font-bold tracking-wider text-blue-400">
        Genres
      </h1>
      <div className=" rounded-xl flex h-[300px] items-center flex-wrap justify-center gap-8">
        {artist.genres?.map((genre) => (
          <Genre key={genre.id} genre={genre.name} />
        ))}
      </div>
    </div>
  );
};

const Genre = ({ genre }: { genre: string }) => {
  return (
    <div className="h-[150px] w-[150px] rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
      <div className="flex bg-black text-xl capitalize items-center justify-center rounded-full w-[130px] h-[130px] ">
        {genre}
      </div>
    </div>
  );
};
