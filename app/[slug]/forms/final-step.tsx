"use client";

import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const FinalBookingStep = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const form = useFormContext<z.infer<typeof BookingSchema>>();

  return (
    <div className="flex gap-4">
      <div className="min-w-[200px] rounded-md h-[200px] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          width={200}
          src={`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`}
        />
      </div>
      <div className="bg-white/5 rounded-md p-4 w-full space-y-3">
        <div className="flex items-center">
          <span className="w-[80px] text-white/50">Event: </span>
          <p className="text-lg font-semibold">{form.watch("eventName")}</p>
        </div>
        <div className="flex items-center">
          <span className="w-[80px] text-white/50">Date: </span>
          <p className="text-lg font-semibold"> {form.watch("eventDate")}</p>
        </div>
        <div className="flex items-center">
          <span className="w-[80px] text-white/50">Time: </span>
          <p className="text-lg font-semibold"> {form.watch("eventTime")}</p>
        </div>
        <div className="capitalize flex items-center">
          <span className="w-[80px] text-white/50">Location: </span>
          <p className="text-lg font-semibold">
            {form.watch("street")}, {form.watch("barangay")},
            {form.watch("municipality")}, {form.watch("province")} @
            {form.watch("landmark")}
          </p>
        </div>
        <div className="capitalize flex items-center">
          <span className="w-[80px] text-white/50">Rate: </span>
          <p className="text-lg font-semibold">
            {form.watch("rateName")} for P{form.watch("rateAmount")}
          </p>
        </div>
      </div>
    </div>
  );
};
