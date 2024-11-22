import { z } from "zod";

import { ArtistInSchema, RateSchema } from "@/schemas/artist-schemas";

export const Prices = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  return (
    <div className="">
      <h1 className="text-center my-6 text-2xl font-bold text-blue-400 mt-12">
        Prices
      </h1>
      <div className=" flex justify-center gap-3 flex-wrap">
        {artist.rates.map((rate) => (
          <Price key={rate.id} rate={rate} />
        ))}
      </div>
    </div>
  );
};

const Price = ({ rate }: { rate: z.infer<typeof RateSchema> }) => {
  return (
    <div className="p-6 bg-white/5 md:w-[270px] border-[1px] border-white/10 rounded-3xl">
      <h1 className="mb-4">{rate.name}</h1>
      <p className="text-4xl font-bold mb-6">
        &#8369;{Math.floor(rate.amount)}
      </p>
      {rate.description && (
        <div>
          <p className="text-xs text-white/40 mb-2">Description</p>
          <p>{rate.description}</p>
        </div>
      )}
    </div>
  );
};
