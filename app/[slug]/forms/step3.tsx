"use client";

import { cn } from "@/lib/utils";
import { useFetchArtistRatesQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { Fragment, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { useBookingContext } from "./booking-provider";


export const Step3 = () => {
    const {artist}= useBookingContext()
  const { data: rates } = useFetchArtistRatesQuery(artist.id.toString());
  const form = useFormContext<z.infer<typeof BookingSchema>>();

  const selectedRateId = form.watch("rate");



  return (
    <Fragment>
      <h1 className="text-center">Choose a Rate</h1>
      <div className="flex  w-full justify-evenly">
        {rates?.map((r) => (
            <div
                onClick={() => {
                form.setValue("rate", r.id.toString());
                form.setValue("rateAmount", r.amount.toString());
                form.setValue("rateName", r.name);
                }}
                key={r.name}
                className={cn(
                "flex flex-col hover:cursor-pointer items-center bg-white p-8 rounded-xl",
                { "bg-blue-500": selectedRateId === r.id.toString() }
                )}
            >
                <p
                className={cn(
                    "capitalize text-black/70",
                     {
                    "text-white/70": selectedRateId === r.id.toString(),
                    }
            )}
                >
                {r.name}
                </p>
                <p
                className={cn("capitalize text-3xl font-bold text-black", {
                    "text-white": selectedRateId === r.id.toString(),
                })}
                >
                P{r.amount}
                </p>
          </div>
        ))}

      </div>
    </Fragment>
  );
};
