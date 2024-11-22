"use client";

import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { useFetchArtistUnavailableDatesQuery } from "@/redux/features/scheduleApiSlice";
import { BookingSchema } from "@/schemas/booking-schemas";

import { CustomDatePicker } from "../components/custom-datepicker";
import { TimeSlotPicker } from "../components/time-slot-picker";

import { useBookingContext } from "./booking-provider";

export const Step1 = () => {
  const { artist } = useBookingContext();
  const { data: unavailableDates = [] } = useFetchArtistUnavailableDatesQuery(
    artist.id,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const form = useFormContext<z.infer<typeof BookingSchema>>();

  useEffect(() => {
    selectedDate && form.setValue("eventDate", selectedDate);
  }, [artist, selectedDate]);

  return (
    <div className="space-y-2">
      <Input
        radius="sm"
        size="lg"
        {...form.register("eventName")}
        isInvalid={!!form.formState.errors.eventName}
        label="What's the event?"
        placeholder="E.g Birthday"
      />

      <CustomDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        unavailableDates={unavailableDates}
      />
      {selectedDate && (
        <TimeSlotPicker artist={artist.id} date={selectedDate} />
      )}
    </div>
  );
};
