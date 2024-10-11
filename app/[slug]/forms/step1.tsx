"use client";

import useFetchAddresses from "@/hooks/utils/use-fetch-addresses";

import { ArtistInSchema, InTimeslotSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

import { Input } from "@nextui-org/input";
import { Fragment, Key, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";


import { cn } from "@/lib/utils";
import { CustomDatePicker } from "../components/custom-datepicker";
import { useFetchArtistUnavailableDatesQuery } from "@/redux/features/scheduleApiSlice";
import { SelectTime } from "../components/select-time";
import { Time } from "@internationalized/date";
import { Chip } from "@nextui-org/chip";
import { TimeInput } from "@nextui-org/date-input";
import { useFetchArtistRatesQuery } from "@/redux/features/artistApiSlice";

export const Step1 = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {
const {data:unavailableDates = []}  = useFetchArtistUnavailableDatesQuery(artist.id)

  const {
    barangays,
    brgyLoading,
    fetchBarangays,
    fetchMunicipalities,
    municipalities,
    municipalityLoading,

  } = useFetchAddresses();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedStartTime, setSelectedStartTime] = useState(new Time(5))
  const [selectedEndTime, setSelectedEndTime] = useState(new Time(10))


  const form = useFormContext<z.infer<typeof BookingSchema>>();
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] =
    useState<any>(null);
  const provinceCode = "072200000"; //CEBU

  useEffect(() => {
    fetchMunicipalities(provinceCode);
  }, []);

  useEffect(() => {
    selectedMunicipalityCode && fetchBarangays(selectedMunicipalityCode);
  }, [selectedMunicipalityCode]);

  function getMunicipalityName(
    municipalities: { name: string; code: string }[],
    municipalityCode: Key
  ) {
    const filtered = municipalities.filter(
      (municipality) => municipality.code === municipalityCode
    );
    return filtered[0].name;
  }


useEffect(()=>{
    form.setValue('eventDate', selectedDate)
    form.setValue('startTime', selectedStartTime)
    form.setValue('endTime', selectedEndTime)
},[artist, selectedDate,selectedStartTime, selectedEndTime])


const handleStartTimeChange = (time: Time) => {
    if (time.compare(selectedEndTime) > 0) {
      form.setError("startTime", {
        type: "manual",
        message: "Start time must be earlier than end time.",
      });
    } else {
      form.clearErrors("startTime");
    }
    setSelectedStartTime(time);
  };

const handleEndTimeChange = (time: Time) => {
    if (time.compare(selectedStartTime) < 0) {
      form.setError("endTime", {
        type: "manual",
        message: "End time must be ahead than start time.",
      });
    } else {
      form.clearErrors("endTime");
    }
    setSelectedEndTime(time);
  };

  return (
    <Fragment>
      <input

        {...form.register("artist")}
        value={artist.id}
        style={{ display: "none" }}
      />

      <Input
        size="lg"

        variant="bordered"
        radius="sm"
        {...form.register("eventName")}
        label="What's the event?"
        placeholder="E.g Birthday"
        isInvalid={!!form.formState.errors.eventName}
      />

      <div className={cn("p-3 w-full flex gap-2 items-center justify-between border-2 border-white/20 rounded-lg",{"border-3 border-red-500":!!form.formState.errors.eventDate})}>
      <CustomDatePicker unavailableDates={unavailableDates} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </div>
<div className="flex gap-3">
      <TimeInput isInvalid={!!form.formState.errors.startTime} errorMessage={form.formState.errors.startTime?.message} classNames={{input:'text-2xl'}} label="Start Time" variant="bordered" size="lg" radius="sm" onChange={handleStartTimeChange} value={selectedStartTime}/>
      <TimeInput  isInvalid={!!form.formState.errors.endTime} errorMessage={form.formState.errors.endTime?.message} classNames={{input:'text-2xl'}}  label="Estimated End Time" variant="bordered" size="lg" radius="sm"  onChange={handleEndTimeChange} value={selectedEndTime}/>
      </div>
      <div className="lg:flex gap-3 space-y-2 lg:space-y-0 items-center">
      <Input
        size="lg"
        variant="bordered"
        radius="sm"
        label="Province"
        value={"Cebu"}
        isReadOnly
      />

      <Autocomplete

        size="lg"
        radius="sm"
        variant="bordered"
        isInvalid={!!form.formState.errors.municipality}
        label="Select city or municipality"
        isLoading={municipalityLoading}
        onSelectionChange={(key) => {
          setSelectedMunicipalityCode(key);
          municipalities &&
            key &&
            form.setValue(
              "municipality",
              getMunicipalityName(municipalities, key)
            );
        }}
      >
        {(municipalities ?? []).map((municipality) => (
          <AutocompleteItem key={municipality.code} value={municipality.code}>
            {municipality.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      </div>
      <div className="md:flex gap-2 space-y-2 md:space-y-0 items-center">
      <Autocomplete

        size="lg"
        isInvalid={!!form.formState.errors.barangay}
        radius="sm"
        variant="bordered"
        label="Select a barangay"
        isLoading={brgyLoading}
        onSelectionChange={(v) => v && form.setValue("barangay", v.toString())}
      >
        {/* Only render AutocompleteItem if barangays is defined */}
        {(barangays ?? []).map((barangay) => (
          <AutocompleteItem key={barangay.name} value={barangay.name}>
            {barangay.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Input

        isInvalid={!!form.formState.errors.street}
        size="lg"
        variant="bordered"
        {...form.register("street")}
        label="Street"
        radius="sm"
      />
      <Input

        isInvalid={!!form.formState.errors.landmark}
        size="lg"
        radius="sm"
        variant="bordered"
        {...form.register("landmark")}
        label="Landmark"
      />
      </div>
    </Fragment>
  );
};
