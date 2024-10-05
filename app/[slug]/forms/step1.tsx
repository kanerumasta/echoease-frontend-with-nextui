"use client";

import useFetchAddresses from "@/hooks/utils/use-fetch-addresses";
import { useFetchArtistUnavailableDatesQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { TimeInput } from "@nextui-org/date-input";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { Fragment, Key, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { useLocale } from "@react-aria/i18n";

export const Step1 = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const {
    barangays,
    brgyLoading,
    fetchBarangays,
    fetchMunicipalities,
    fetchProvinces,
    municipalities,
    municipalityLoading,
    pronvinceLoading,
    provinces,
  } = useFetchAddresses();

  const {data:unavailableDates, isLoading:loadingUnavailableDates} = useFetchArtistUnavailableDatesQuery(artist.id.toString())
  console.log('unavaialbe', unavailableDates)

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
console.log(unavailableDates)
const isDateUnavailable = (date:DateValue)=>{

    const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
console.log(formattedDate)
return unavailableDates?.includes(formattedDate) || false
}

  return (
    <Fragment>
      <input
        {...form.register("artist")}
        value={artist.id}
        style={{ display: "none" }}
      />

      <Input
        size="lg"
        color="primary"
        variant="underlined"
        radius="sm"
        {...form.register("eventName")}
        label="What's the event?"
        placeholder="E.g Birthday"
        isInvalid={!!form.formState.errors.eventName}
      />
      <DatePicker
        color="primary"
        size="lg"
        variant="underlined"
        classNames={{calendarContent:'text-5xl w-full min-w-[600px]',popoverContent:"min-w-[600px]",calendar:'min-w-[600px] min-h-[400px]'}}
        radius="sm"
        onChange={(e) =>
          form.setValue("eventDate", `${e.month}/${e.day}/${e.year}`)
        }
        label="When should we mark our calendars?"
        minValue={today(getLocalTimeZone()).add({ days: 1 })}

        maxValue={today(getLocalTimeZone()).add({ years: 1 })}
        isDateUnavailable={isDateUnavailable}
        isInvalid={!!form.formState.errors.eventDate}
      />
      <TimeInput
        color="primary"
        size="lg"
        variant="underlined"
        radius="sm"
        aria-label="time-input"
        label="At what time?"
        onChange={(e) => form.setValue("eventTime", e.toString())}
        isInvalid={!!form.formState.errors.eventTime}
      />
      <Input
        color="primary"
        {...form.register("province")}
        size="lg"
        variant="underlined"
        radius="sm"
        label="Province"
        value={"Cebu"}
        isReadOnly
      />

      <Autocomplete
        color="primary"
        size="lg"
        radius="sm"
        variant="underlined"
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
      <Autocomplete
        color="primary"
        size="lg"
        isInvalid={!!form.formState.errors.barangay}
        radius="sm"
        variant="underlined"
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
        color="primary"
        isInvalid={!!form.formState.errors.street}
        size="lg"
        variant="underlined"
        {...form.register("street")}
        label="Street"
      />
      <Input
        color="primary"
        isInvalid={!!form.formState.errors.landmark}
        size="lg"
        variant="underlined"
        {...form.register("landmark")}
        label="Landmark"
      />
    </Fragment>
  );
};
