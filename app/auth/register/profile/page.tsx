"use client";
import GenderPicker from "@/components/gender-picker";
import { CalendarIcon } from "@/components/icons/calendar";
import PhoneIcon from "@/components/icons/phone";
import useSetupProfile from "@/hooks/auth/use-setup-profile";
import useFetchAddresses from "@/hooks/utils/use-fetch-addresses";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { DateInput } from "@nextui-org/date-input";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { useSearchParams } from "next/navigation";
import { Fragment, Key, Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CompleteProfilePage() {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [gender, setGender] = useState<"male" | "female">("male");

  const redirect = typeof window !== "undefined" ? new URL(window.location.href).searchParams.get("redirect") || "/" : "/";

  const { form, onSubmit, isLoading, isSuccess, isError } = useSetupProfile();
  const profileImage = form.watch("profile_image");

  const [selectedProvinceCode, setSelectedProvinceCode] = useState<any>(null);
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] =
    useState<any>(null);

  const {
    provinces,
    pronvinceLoading,
    municipalities,
    municipalityLoading,
    barangays,
    brgyLoading,
    fetchMunicipalities,
    fetchBarangays,
    fetchProvinces,
  } = useFetchAddresses();

  useEffect(() => {
    fetchProvinces();
  }, []);
  useEffect(() => {
    if (selectedProvinceCode) {
      fetchMunicipalities(selectedProvinceCode);
    }
    if (selectedMunicipalityCode) {
      fetchBarangays(selectedMunicipalityCode);
    }
  }, [selectedProvinceCode, selectedMunicipalityCode]);

  useEffect(() => {
    form.setValue("gender", gender);
  }, [gender]);

  function getProvinceName(
    provinces: { name: string; code: string }[],
    provinceCode: Key
  ) {
    const filtered = provinces.filter(
      (province) => province.code === provinceCode
    );
    return filtered[0].name;
  }
  function getMunicipalityName(
    municipalities: { name: string; code: string }[],
    municipalityCode: Key
  ) {
    const filtered = municipalities.filter(
      (municipality) => municipality.code === municipalityCode
    );
    return filtered[0].name;
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Your profile is now complete.");
      setTimeout(() => {
        window.location.href = redirect;
      }, 1000);
    }
  }, [isSuccess]);

  return (
    <Suspense>
      <div className="md:w-[50%] mx-auto w-full lg:w-[40%]">
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>
        <p className="text-black/50 dark:text-white/50 text-sm mt-2 mb-4">
          Fill in the details below to finalize your profile and get started.
        </p>
        <form
          {...form}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <div className="flex items-end justify-between space-x-2">
            <div className="space-y-4 w-full">
              <GenderPicker value={gender} onChange={setGender} />
                <DateInput
                   
                onChange={(date) =>
                  date && form.setValue("dob", date.toString())
                }
                radius="sm"
                maxValue={today(getLocalTimeZone()).subtract({ years: 5 })}
                variant="faded"
                label="Date of Birth"
                endContent={
                  <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>

            <div
              onClick={() => imageRef?.current?.click()}
              className="flex relative  border-gray-500 overflow-hidden flex-col rounded-md items-center justify-center min-w-[150px] h-[150px] transition duration-200 ease-in  border-2 hover:bg-black/10  dark:hover:bg-white/10 cursor-pointer"
            >
              {profileImage ? (
                <Fragment>
                  <img
                    className="w-full h-full object-cover"
                    alt={profileImage.name}
                    width={100}
                    height={100}
                    src={URL.createObjectURL(profileImage)}
                  />
                  <p className="text-xs dark:text-white absolute bottom-4">
                    Change Image
                  </p>
                </Fragment>
              ) : (
                <Fragment>
                  <Image
                    alt="Upload Image"
                    src="/media/upload.png"
                    width={40}
                  />
                  <p className="text-md italic text-center text-black/50 dark:text-white/50">
                    Upload Profile Image
                  </p>
                </Fragment>
              )}
              <input
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    form.setValue("profile_image", e.target.files[0]);
                  }
                }}
                ref={imageRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          </div>

          <Input
            {...form.register("phone")}
                      type="number"
                      startContent={'+63'}
            variant="faded"
            isInvalid={!!form.formState.errors.phone}
            errorMessage={form.formState.errors.phone?.message}
                      label="Contact No."
                      placeholder="9xxxxxxxxx"
                      radius="sm"
                      size="lg"
            endContent={
              <PhoneIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <div className="flex space-x-2">
            <Input
                          variant="faded"
                          size="lg"
              radius="sm"
              label="Country"
              defaultValue="Philippines"
              isReadOnly
            />

            <Autocomplete
              isInvalid={!!form.formState.errors.province}
              errorMessage={form.formState.errors.province?.message}
              radius="sm"
              size="lg"
              variant="faded"
              label="Select a province"
              onSelectionChange={(val) => {
                setSelectedProvinceCode(val);
                val &&
                  form.setValue("province", getProvinceName(provinces, val));
              }}
              isLoading={pronvinceLoading}
            >
              {provinces.map((prov) => (
                <AutocompleteItem key={prov.code} value={prov.code}>
                  {prov.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="flex space-x-2">
            <Autocomplete
            size="lg"
              isInvalid={!!form.formState.errors.municipality}
              errorMessage={form.formState.errors.municipality?.message}
              radius="sm"
              variant="faded"
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
                <AutocompleteItem
                  key={municipality.code}
                  value={municipality.code}
                >
                  {municipality.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Autocomplete
            size="lg"
              isInvalid={!!form.formState.errors.brgy}
              errorMessage={form.formState.errors.brgy?.message}
              radius="sm"
              variant="faded"
              label="Select a barangay"
              isLoading={brgyLoading}
              onSelectionChange={(v) =>
                v && form.setValue("brgy", v.toString())
              }
            >
              {/* Only render AutocompleteItem if barangays is defined */}
              {(barangays ?? []).map((barangay) => (
                <AutocompleteItem key={barangay.name} value={barangay.name}>
                  {barangay.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="flex space-x-2">
            <Input
              {...form.register("street")}
              variant="faded"
              size="lg"
              isInvalid={!!form.formState.errors.street}
              errorMessage={form.formState.errors.street?.message}
              label="Street"
              radius="sm"
            />
            <Input
              {...form.register("zipcode")}
              variant="faded"
              size="lg"
              label="Zip Code"
              isInvalid={!!form.formState.errors.zipcode}
              errorMessage={form.formState.errors.zipcode?.message}
              radius="sm"
            />
          </div>

          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            className="w-full"
            radius="sm"
            size="lg"
            color="primary"
            type="submit"
          >
            Submit Profile
          </Button>
        </form>
        {/* <DevTool control={form.control} /> */}
      </div>
    </Suspense>
  );
}
