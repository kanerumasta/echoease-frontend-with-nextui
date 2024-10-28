"use client";

import { z } from "zod";

import { useFetchArtistsWithFilterQuery } from "@/redux/features/artistApiSlice";
import { GenreSchema } from "@/schemas/artist-schemas";

import EchoeeGroup from "./echoee-group";
import { CustomSkeleton } from "./cskeleton";

type FilterResultsProps = {
  budgetRange: number | number[] | null;
  genres: z.infer<typeof GenreSchema>[];
  searchText: string | null;
  category: string | null;
  filterApplied: boolean;
  title: string;
};

export const FilterResults: React.FC<FilterResultsProps> = ({
  filterApplied,
  budgetRange,
  genres,
  searchText,
  category,
  title,
}) => {
  const genresFilter = genres && genres.map((genre) => genre.id);
  const filters = {
    min_price:
      filterApplied && Array.isArray(budgetRange) ? budgetRange[0] : null,
    max_price:
      filterApplied && Array.isArray(budgetRange) ? budgetRange[1] : null,
    q: searchText,
    genres: filterApplied ? genresFilter : [],
    category: category,
  };

  const { data: echoees, isLoading } = useFetchArtistsWithFilterQuery(filters);

  return (
    <div>
      {isLoading && <CustomSkeleton />}
      {!isLoading && echoees && echoees.length <= 0 && <p>No echoee found..</p>}
      {echoees && <EchoeeGroup echoeeList={echoees} title={title} />}
    </div>
  );
};
