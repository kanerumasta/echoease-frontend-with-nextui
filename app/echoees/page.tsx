"use client";

import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";
import { z } from "zod";

import { GenreSchema } from "@/schemas/artist-schemas";
import EchoLoading from "@/components/echo-loading";
import useLoginRequired from "@/hooks/use-login-required";

import { BudgetRange } from "./components/budget-range";
import { FilterResults } from "./components/filters-results";
import { MultipleGenresPicker } from "./components/genres-picker";
import { SearchInput } from "./components/search-input";

// export default function EchoeesPage() {
//   const [budgetRange, setBudgetRange] = useState<number | number[]>([0, 5000]);
//   const [searchFilter, setSearchFilter] = useState("");
//   const [genresFilter, setGenresFilter] = useState<
//     z.infer<typeof GenreSchema>[]
//   >([]);
//   const [activeBudgetRange, setActiveBudgetRange] = useState(false);
//   const {loginChecked} = useLoginRequired('/echoees')

//   if(!loginChecked) {
//     return <EchoLoading />
//   }

//   return (
//     <div>

//       <div className="flex flex-col md:flex-row justify-between gap-3 mb-8">
//         <SearchInput
//           setSearchFilter={setSearchFilter}
//         />
//         <div className="flex w-full md:w-[400px] flex-col gap-3">
//           <div className="flex gap-3 w-full items-center">
//             <Checkbox
//               isSelected={activeBudgetRange}
//               onValueChange={setActiveBudgetRange}
//             />
//             <BudgetRange
//               active={activeBudgetRange}
//               budgetRange={budgetRange}
//               setBudgetRange={setBudgetRange}
//             />
//           </div>
//           <MultipleGenresPicker setPickedGenres={setGenresFilter} />
//         </div>
//       </div>
//       {searchFilter && (
//         <>
//           <h1 className="text-2xl mb-6 font-bold text-white/50 ">
//             Search Results for{" "}
//             <span className="italic tracking-wide text-white">
//               &quot;{searchFilter}&quot;
//             </span>
//           </h1>
//           <FilterResults
//             budgetRange={activeBudgetRange ? budgetRange : null}
//             category={null}
//             genres={genresFilter}
//             searchText={searchFilter}
//             title=""
//           />
//         </>
//       )}

//       {searchFilter.length <= 0 && (
//         <>
//         <FilterResults
//           budgetRange={activeBudgetRange ? budgetRange : null}
//           category={"top"}
//           genres={genresFilter}
//           searchText={null}
//           title="Top Echoees"
//         />

//         <FilterResults
//           budgetRange={activeBudgetRange ? budgetRange : null}
//           category={"new"}
//           genres={genresFilter}
//           searchText={null}
//           title="Fresh Voices"
//         />
//           <FilterResults
//             budgetRange={activeBudgetRange ? budgetRange : null}
//             category={"near"}
//             genres={genresFilter}
//             searchText={null}
//             title="Echoees Near You"
//           />
//         <FilterResults
//           budgetRange={activeBudgetRange ? budgetRange : null}
//           category={"versatile"}
//           genres={genresFilter}
//           searchText={null}
//           title="Versatile Performers"
//         />
//         <FilterResults
//           budgetRange={activeBudgetRange ? budgetRange : null}
//           category={null}
//           genres={genresFilter}
//           searchText={null}
//           title="All Echoees"
//         />
//         </>
//       )}
//     </div>
//   );
// }

// const CustomSkeleton = () => {
//   return (
//     <div className="flex overflow-x-hidden gap-2">
//       <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
//       <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg " />
//       <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
//       <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
//       <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
//       <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
//       <Skeleton className="max-w-[250px] max-h-[300px] min-w-[250px] min-h-[300px] rounded-lg" />
//     </div>
//   );
// };

type Genre = {
    id: number;
    name: string;
  };

export default function EchoeesPage() {
  const [draftBudgetRange, setDraftBudgetRange] = useState<number | number[]>([
    0, 5000,
  ]);
  const [searchFilter, setSearchFilter] = useState("");

  const [draftGenresFilter, setDraftGenresFilter] = useState<Genre[]>([]);
  const [draftActiveBudgetRange, setDraftActiveBudgetRange] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    budgetRange: draftBudgetRange,
    genresFilter: draftGenresFilter,
    activeBudgetRange: false,
  });

  const { loginChecked } = useLoginRequired("/echoees");

  if (!loginChecked) {
    return <EchoLoading />;
  }

  const applyFilters = () => {
    setAppliedFilters({
      budgetRange: Array.isArray(draftBudgetRange) ? draftBudgetRange : [draftBudgetRange, draftBudgetRange],
      genresFilter: draftGenresFilter,
      activeBudgetRange: draftActiveBudgetRange,
    });
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-8">
        <SearchInput setSearchFilter={setSearchFilter} />
        <div className="flex w-full md:w-[400px] flex-col gap-3">
          <div className="flex gap-3 w-full items-center">
            <Checkbox
              isSelected={draftActiveBudgetRange}
              onValueChange={setDraftActiveBudgetRange}
            />
            <BudgetRange
              active={draftActiveBudgetRange}
              budgetRange={draftBudgetRange}
              setBudgetRange={setDraftBudgetRange}
            />
          </div>
          <MultipleGenresPicker setPickedGenres={setDraftGenresFilter} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="bg-primary text-white" onPress={applyFilters}>
          Apply Filters
        </Button>
      </div>

      {searchFilter ? (
        <>
          <h1 className="text-2xl mb-6 font-bold text-white/50 ">
            Search Results for{" "}
            <span className="italic tracking-wide text-white">
              &quot;{searchFilter}&quot;
            </span>
          </h1>
          <FilterResults
            budgetRange={null}
            category={null}
            genres={[]}
            searchText={searchFilter}
            title=""
          />
        </>
      ) : (
        <>
          <FilterResults
            budgetRange={
              appliedFilters.activeBudgetRange
                ? appliedFilters.budgetRange
                : null
            }
            category={"top"}
            genres={appliedFilters.genresFilter}
            searchText={null}
            title="Top Echoees"
          />

          <FilterResults
            budgetRange={
              appliedFilters.activeBudgetRange
                ? appliedFilters.budgetRange
                : null
            }
            category={"new"}
            genres={appliedFilters.genresFilter}
            searchText={null}
            title="Fresh Voices"
          />

          <FilterResults
            budgetRange={
              appliedFilters.activeBudgetRange
                ? appliedFilters.budgetRange
                : null
            }
            category={"near"}
            genres={appliedFilters.genresFilter}
            searchText={null}
            title="Echoees Near You"
          />

          <FilterResults
            budgetRange={
              appliedFilters.activeBudgetRange
                ? appliedFilters.budgetRange
                : null
            }
            category={"versatile"}
            genres={appliedFilters.genresFilter}
            searchText={null}
            title="Versatile Performers"
          />

          <FilterResults
            budgetRange={
              appliedFilters.activeBudgetRange
                ? appliedFilters.budgetRange
                : null
            }
            category={null}
            genres={appliedFilters.genresFilter}
            searchText={null}
            title="All Echoees"
          />
        </>
      )}
    </div>
  );
}
