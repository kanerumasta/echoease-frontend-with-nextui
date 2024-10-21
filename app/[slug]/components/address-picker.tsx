import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useFetchAddresses from "@/hooks/utils/use-fetch-addresses";
import { z } from "zod";
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

  const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState<any>(null);

  useEffect(() => {
    fetchMunicipalities(provinceCode);
  }, [provinceCode]);

  useEffect(() => {
    selectedMunicipalityCode && fetchBarangays(selectedMunicipalityCode);
  }, [selectedMunicipalityCode]);

  const getMunicipalityName = (municipalityCode: string) => {
    const municipality = municipalities.find((m) => m.code === municipalityCode);
    return municipality ? municipality.name : "";
  };

  return (
    <div className="space-y-3">
      <Input size="lg" variant="bordered" radius="sm" label="Province" value="Cebu" isReadOnly />

      <Autocomplete
        size="lg"
        radius="sm"
        variant="bordered"
        label="Select city or municipality"
        placeholder={form.watch("municipality")}
        isLoading={municipalityLoading}
        isInvalid={!!form.formState.errors.municipality}
        errorMessage={form.formState.errors.municipality?.message}
        onSelectionChange={(key) => {
          setSelectedMunicipalityCode(key);
          form.setValue('barangay','')
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

        size="lg"
        radius="sm"
        variant="bordered"
        placeholder={form.watch("barangay")}
        label="Select a barangay"
        isLoading={brgyLoading}
        value={form.watch("barangay")}
        isInvalid={!!form.formState.errors.barangay}
        errorMessage={form.formState.errors.barangay?.message}
        onSelectionChange={(v) => v && form.setValue("barangay", v.toString())}
      >
        {barangays.map((barangay) => (
          <AutocompleteItem key={barangay.name} value={barangay.name}>
            {barangay.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <Input
        isInvalid={!!form.formState.errors.street}
        errorMessage={form.formState.errors.street?.message}
        size="lg"
        variant="bordered"
        {...form.register("street")}
        label="Street"
        radius="sm"
      />

      <Input
        isInvalid={!!form.formState.errors.landmark}
        errorMessage={form.formState.errors.landmark?.message}
        size="lg"
        variant="bordered"
        {...form.register("landmark")}
        label="Landmark"
        radius="sm"
      />
      <Input
        isInvalid={!!form.formState.errors.venue}
        errorMessage={form.formState.errors.venue?.message}
        size="lg"
        variant="bordered"
        {...form.register("venue")}
        label="Event Venue"
        radius="sm"
      />
    </div>
  );
};
