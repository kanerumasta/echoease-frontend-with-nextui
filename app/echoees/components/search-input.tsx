'use client'

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete"
import { Input } from "@nextui-org/input"
import { IoSearch } from "react-icons/io5"
import { TiThLargeOutline } from "react-icons/ti";

export const SearchInput = () => {
    return <div className="mb-8 flex gap-2 justify-end">
        <Input classNames={{base:' w-full lg:w-1/4'}} placeholder="Search"  radius="full" endContent={<IoSearch />} size="lg"/>
        <Autocomplete startContent={<TiThLargeOutline size={30}/>} placeholder="Genres" size="lg"  classNames={{base:'w-[200px]'}}>
            <AutocompleteItem key="sdf"></AutocompleteItem>
        </Autocomplete>
    </div>
}
