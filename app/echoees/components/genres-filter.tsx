"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { TiThLargeOutline } from "react-icons/ti";

export const GenresFilter = () => {
  return (
    <div className="w-full">
      <Autocomplete
        classNames={{ base: "w-full" }}
        placeholder="Genres"
        size="lg"
        startContent={<TiThLargeOutline size={30} />}
      >
        <AutocompleteItem key="sdf">zasdfds</AutocompleteItem>
      </Autocomplete>
    </div>
  );
};
