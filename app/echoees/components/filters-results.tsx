"use client";

import { z } from "zod";
import { GenreSchema } from "@/schemas/artist-schemas";
import EchoeeGroup from "./echoee-group";
import React from "react";

type FilterResultsProps = {
  budgetRange: number | number[] | null;
  genres: z.infer<typeof GenreSchema>[];
  searchText: string | null;
  category: string | null;
  title: string;
};

export const FilterResults: React.FC<FilterResultsProps> = React.memo(({
  budgetRange,
  genres,
  searchText,
  category,
  title,
}) => {
  const genresFilter = genres.map((genre) => genre.id);


  const filters = {
    min_price: Array.isArray(budgetRange) ? budgetRange[0] : null,
    max_price:Array.isArray(budgetRange) ? budgetRange[1] : null,
    q: searchText,
    genres: genresFilter,
    category: category,
  };

  return (
    <div>
      <EchoeeGroup filters={filters} title={title} />
    </div>
  );
});

// Set displayName for easier debugging
FilterResults.displayName = "FilterResults";
