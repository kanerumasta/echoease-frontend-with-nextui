"use client";

import { Dispatch, SetStateAction } from "react";

type CardPickerProps<T> = {
  picked: T;
  setPicked: Dispatch<SetStateAction<T>>;
  items: T[];
  render: (item: T) => JSX.Element;
};

export const CardPicker = <T,>(props: CardPickerProps<T>) => {
  return (
    <div>
      {props.items.map((item, index) => (
        <div key={index}>{props.render(item)}</div>
      ))}
    </div>
  );
};
