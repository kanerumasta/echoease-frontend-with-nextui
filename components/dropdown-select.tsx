"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { Dispatch, SetStateAction } from "react";

type DropdownSelectorProps<T> = {
  label: string;
  placeholder: string;
  items: T[];
  pickedItem: T;
  setPickedItem: Dispatch<SetStateAction<T>>;
  renderer: (item: T) => JSX.Element;
};

export const DropdownSelector = <T,>({
  items,
  pickedItem,
  setPickedItem,
  label,
  placeholder,
  renderer,
}: DropdownSelectorProps<T>) => {
  return (
    <Select label={label} placeholder={placeholder}>
      {items.map((item, index) => (
        <SelectItem key={index}>{renderer(item)}</SelectItem>
      ))}
    </Select>
  );
};
