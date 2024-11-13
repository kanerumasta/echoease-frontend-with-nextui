"use client";

import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { useFetchArtistRatesQuery } from "@/redux/features/artistApiSlice";
import { BookingSchema } from "@/schemas/booking-schemas";

import { useBookingContext } from "./booking-provider";

export const Step3 = () => {
  const { artist } = useBookingContext();
  const { data: rates } = useFetchArtistRatesQuery(artist.id.toString());
  const form = useFormContext<z.infer<typeof BookingSchema>>();

  const selectedRateId = form.watch("rate");

  return (
    <Fragment>
      <h1 className="text-white/50 text-right mb-4 capitalize">
        Choose From {artist.user.first_name}&apos;s Available Package
      </h1>
      <div className="flex  w-full justify-evenly">
        {rates?.map((r) => (
          <div
            key={r.name}
            className={cn(
              "flex flex-col hover:cursor-pointer items-center bg-white p-8 rounded-xl",
              { "bg-blue-500": selectedRateId === r.id.toString() },
            )}
            onClick={() => {
              form.setValue("rate", r.id.toString());
              form.setValue("rateAmount", r.amount.toString());
              form.setValue("rateName", r.name);
            }}
            role="button"
            tabIndex={0}
            aria-pressed={selectedRateId === r.id.toString()}
          >
            <p
              className={cn("capitalize text-black/70", {
                "text-white/70": selectedRateId === r.id.toString(),
              })}
            >
              {r.name}
            </p>
            <p
              className={cn("capitalize text-3xl font-bold text-black", {
                "text-white": selectedRateId === r.id.toString(),
              })}
            >
              P{Math.round(r.amount)}
            </p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
