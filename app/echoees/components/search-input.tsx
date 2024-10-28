"use client";

import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction, useState } from "react";
import { IoSearch } from "react-icons/io5";

export const SearchInput = ({
  setSearchFilter,
}: {
  setSearchFilter: Dispatch<SetStateAction<string>>;
}) => {
  const [localSearchFilter, setLocalSearchFilter] = useState("");

  return (
    <div className="min-w-[400px] flex justify-center h-[50px] items-center  gap-2">
      <Input
        fullWidth
        isClearable
        classNames={{ base: " w-full" }}
        placeholder="Search Echoee"
        radius="full"
        size="lg"
        value={localSearchFilter}
        onChange={(e) => e.target.value === "" && setSearchFilter("")}
        onClear={() => setSearchFilter("")}
        onValueChange={setLocalSearchFilter}
      />
      {localSearchFilter && (
        <IoSearch
          className="hover:text-blue-400 cursor-pointer"
          size={25}
          onClick={() => setSearchFilter(localSearchFilter)}
        />
      )}
    </div>
  );
};
