import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import useFetchAddresses from "@/hooks/utils/use-fetch-addresses";
import { BookingSchema } from "@/schemas/booking-schemas";

interface AddressPickerProps {
  provinceCode: string;
}

export const AddressPicker = ({ provinceCode }: AddressPickerProps) => {
  const form = useFormContext<z.infer<typeof BookingSchema>>();
  const {
    barangays = [],
    brgyLoading,
    fetchBarangays,
    fetchMunicipalities,
    municipalities = [],
    municipalityLoading,
  } = useFetchAddresses();

  const [selectedMunicipalityCode, setSelectedMunicipalityCode] =
    useState<any>(null);

  useEffect(() => {
    fetchMunicipalities(provinceCode);
  }, [provinceCode]);

  useEffect(() => {
    selectedMunicipalityCode && fetchBarangays(selectedMunicipalityCode);
  }, [selectedMunicipalityCode]);

  const getMunicipalityName = (municipalityCode: string) => {
    const municipality = municipalities.find(
      (m) => m.code === municipalityCode,
    );

    return municipality ? municipality.name : "";
  };

  return (
    <div className="space-y-3">
      <Input
        isReadOnly
        label="Province"
        radius="sm"
        size="lg"
        value="Cebu"
        variant="bordered"
      />

      <Autocomplete
        errorMessage={form.formState.errors.municipality?.message}
        isInvalid={!!form.formState.errors.municipality}
        isLoading={municipalityLoading}
        label="Select city or municipality"
        placeholder={form.watch("municipality")}
        radius="sm"
        size="lg"
        variant="bordered"
        onSelectionChange={(key) => {
          setSelectedMunicipalityCode(key);
          form.setValue("barangay", "");
          form.setValue("municipality", getMunicipalityName(key as string));
        }}
      >
        {municipalities.map((municipality) => (
          <AutocompleteItem key={municipality.code} value={municipality.code}>
            {municipality.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <Autocomplete
        errorMessage={form.formState.errors.barangay?.message}
        isInvalid={!!form.formState.errors.barangay}
        isLoading={brgyLoading}
        label="Select a barangay"
        placeholder={form.watch("barangay")}
        radius="sm"
        size="lg"
        value={form.watch("barangay")}
        variant="bordered"
        onSelectionChange={(v) => v && form.setValue("barangay", v.toString())}
      >
        {barangays.map((barangay) => (
          <AutocompleteItem key={barangay.name} value={barangay.name}>
            {barangay.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <Input
        errorMessage={form.formState.errors.street?.message}
        isInvalid={!!form.formState.errors.street}
        size="lg"
        variant="bordered"
        {...form.register("street")}
        label="Street"
        radius="sm"
      />

      <Input
        errorMessage={form.formState.errors.landmark?.message}
        isInvalid={!!form.formState.errors.landmark}
        size="lg"
        variant="bordered"
        {...form.register("landmark")}
        label="Landmark"
        radius="sm"
      />
      <Input
        errorMessage={form.formState.errors.venue?.message}
        isInvalid={!!form.formState.errors.venue}
        size="lg"
        variant="bordered"
        {...form.register("venue")}
        label="Event Venue"
        radius="sm"
      />
    </div>
  );
};
