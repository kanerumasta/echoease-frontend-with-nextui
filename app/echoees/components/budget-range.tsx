"use client";

import { Slider } from "@nextui-org/slider";
import { Dispatch, SetStateAction } from "react";

type BudgetRangeProps = {
  active: boolean;
  budgetRange: number | number[];
  setBudgetRange: Dispatch<SetStateAction<number | number[]>>;
};

export const BudgetRange = ({
  active,
  budgetRange,
  setBudgetRange,
}: BudgetRangeProps) => {
  return (
    <div className="w-full">
      <Slider
        className="w-full"
        formatOptions={{ style: "currency", currency: "PHP" }}
        isDisabled={!active}
        label="Budget Range"
        maxValue={50000}
        minValue={0}
        step={100}
        value={budgetRange}
        onChange={(e) => setBudgetRange(e)}
      />
    </div>
  );
};
