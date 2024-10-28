"use client";

import { Skeleton } from "@nextui-org/skeleton";
import { Spacer } from "@nextui-org/spacer";
import { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { z } from "zod";
import { Button } from "@nextui-org/button";

import { useFetchListArtistsQuery } from "@/redux/features/artistApiSlice";
import { GenreSchema } from "@/schemas/artist-schemas";

import { SearchInput } from "./components/search-input";
import { BudgetRange } from "./components/budget-range";
import { MultipleGenresPicker } from "./components/genres-picker";
import { FilterResults } from "./components/filters-results";

export default function EchoeesPage() {
  const { data, isLoading } = useFetchListArtistsQuery();
  const [budgetRange, setBudgetRange] = useState<number | number[]>([0, 5000]);
  const [searchFilter, setSearchFilter] = useState("");
  const [genresFilter, setGenresFilter] = useState<
    z.infer<typeof GenreSchema>[]
  >([]);
  const [activeBudgetRange, setActiveBudgetRange] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);

  if (isLoading) {
    return (
      <div>
        <CustomSkeleton />
        <Spacer y={10} />
        <CustomSkeleton />
        <Spacer y={10} />
        <CustomSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between gap-3 mb-8">
        <SearchInput
          setSearchFilter={setSearchFilter}
        />
        <div className="flex  w-[400px] flex-col gap-3">
          <div className="flex gap-3 w-full items-center">
            <Checkbox
              isSelected={activeBudgetRange}
              onValueChange={setActiveBudgetRange}
            />
            <BudgetRange
              active={activeBudgetRange}
              budgetRange={budgetRange}
              setBudgetRange={setBudgetRange}
            />
          </div>
          <MultipleGenresPicker setPickedGenres={setGenresFilter} />
          <Button
            color={filterApplied ? "default" : "primary"}
            onPress={() => setFilterApplied(!filterApplied)}
          >
            {filterApplied ? "Clear Filter" : "Apply Filter"}
          </Button>
        </div>
      </div>
      {searchFilter && (
        <>
          <h1 className="text-2xl mb-6 font-bold text-white/50 ">
            Search Results for{" "}
            <span className="italic tracking-wide text-white">
              &quot;{searchFilter}&quot;
            </span>
          </h1>
          <FilterResults
            budgetRange={activeBudgetRange ? budgetRange : null}
            category={null}
            filterApplied={filterApplied}
            genres={genresFilter}
            searchText={searchFilter}
            title=""
          />
        </>
      )}

      {searchFilter.length <= 0 && (
        <FilterResults
          budgetRange={activeBudgetRange ? budgetRange : null}
          category={null}
          filterApplied={filterApplied}
          genres={genresFilter}
          searchText={null}
          title="Top Echoees"
        />
      )}

      {searchFilter.length <= 0 && (
        <FilterResults
          budgetRange={activeBudgetRange ? budgetRange : null}
          category={"new"}
          filterApplied={filterApplied}
          genres={genresFilter}
          searchText={null}
          title="Fresh Voices"
        />
      )}
    </div>
  );
}

const CustomSkeleton = () => {
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
