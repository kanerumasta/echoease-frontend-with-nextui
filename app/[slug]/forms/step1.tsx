"use client";


import { BookingSchema } from "@/schemas/booking-schemas";

import { useFetchArtistUnavailableDatesQuery } from "@/redux/features/scheduleApiSlice";
import { Input } from "@nextui-org/input";
import { Fragment, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { useBookingContext } from "./booking-provider";
import { AddressPicker } from "../components/address-picker";
import { CustomDatePicker } from "../components/custom-datepicker";
import { TimeSlotPicker } from "../components/time-slot-picker";

export const Step1 = () => {
    const {artist} = useBookingContext()
    const {data:unavailableDates = []}  = useFetchArtistUnavailableDatesQuery(artist.id)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const form = useFormContext<z.infer<typeof BookingSchema>>();


    useEffect(()=>{
        form.setValue('eventDate', selectedDate)
    },[artist, selectedDate])

    return (
        <Fragment>
        <Input
            size="lg"
            variant="bordered"
            radius="sm"
            {...form.register("eventName")}
            label="What's the event?"
            placeholder="E.g Birthday"
            isInvalid={!!form.formState.errors.eventName}
        />

        <CustomDatePicker unavailableDates={unavailableDates} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        <TimeSlotPicker date={selectedDate} artist={artist.id} />
        </Fragment>
  );
};
