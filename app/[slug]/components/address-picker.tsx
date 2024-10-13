import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useFetchAddresses from "@/hooks/utils/use-fetch-addresses";
import { z } from "zod";

interface AddressPickerProps {
  provinceCode: string;
}

export const AddressPicker = ({ provinceCode }: AddressPickerProps) => {
  const form = useFormContext();
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
        onSelectionChange={(key) => {
          setSelectedMunicipalityCode(key);
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
        size="lg"
        variant="bordered"
        {...form.register("street")}
        label="Street"
        radius="sm"
      />

      <Input
        isInvalid={!!form.formState.errors.landmark}
        size="lg"
        variant="bordered"
        {...form.register("landmark")}
        label="Landmark"
        radius="sm"
      />
    </div>
  );
};
