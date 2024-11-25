"use client";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { DateInput } from "@nextui-org/date-input";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Fragment, Key, Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import useFetchAddresses from "@/hooks/utils/use-fetch-addresses";
import useSetupProfile from "@/hooks/auth/use-setup-profile";
import PhoneIcon from "@/components/icons/phone";
import { CalendarIcon } from "@/components/icons/calendar";
import GenderPicker from "@/components/gender-picker";
import useLoginRequired from "@/hooks/use-login-required";
import EchoLoading from "@/components/echo-loading";

export default function CompleteProfilePage() {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [gender, setGender] = useState<"male" | "female">("male");

  const redirect =
    typeof window !== "undefined"
      ? new URL(window.location.href).searchParams.get("redirect") || "/"
      : "/";

  const { form, onSubmit, isLoading, isSuccess } = useSetupProfile();
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

  const { loginChecked, isError } = useLoginRequired(redirect);

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
    provinceCode: Key,
  ) {
    const filtered = provinces.filter(
      (province) => province.code === provinceCode,
    );

    return filtered[0].name;
  }
  function getMunicipalityName(
    municipalities: { name: string; code: string }[],
    municipalityCode: Key,
  ) {
    const filtered = municipalities.filter(
      (municipality) => municipality.code === municipalityCode,
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

  if (!loginChecked) {
    return <EchoLoading />;
  }

  return (
    <Suspense>
      <div className="md:w-[50%] mx-auto w-full lg:w-[40%]">
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>
        <p className="text-black/50 dark:text-white/50 text-sm mt-2 mb-4">
          Fill in the details below to finalize your profile and get started.
        </p>
        <form
          {...form}
          className="space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-end justify-between space-x-2">
            <div className="space-y-4 w-full">
              <GenderPicker value={gender} onChange={setGender} />
              <DateInput
                endContent={
                  <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Date of Birth"
                maxValue={today(getLocalTimeZone()).subtract({ years: 5 })}
                radius="sm"
                variant="faded"
                onChange={(date) =>
                  date && form.setValue("dob", date.toString())
                }
              />
            </div>

            <div
              className="flex relative  border-gray-500 overflow-hidden flex-col rounded-md items-center justify-center min-w-[150px] h-[150px] transition duration-200 ease-in  border-2 hover:bg-black/10  dark:hover:bg-white/10 cursor-pointer"
              onClick={() => imageRef?.current?.click()}
            >
              {profileImage ? (
                <Fragment>
                  <img
                    alt={profileImage.name}
                    className="w-full h-full object-cover"
                    height={100}
                    src={URL.createObjectURL(profileImage)}
                    width={100}
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
                ref={imageRef}
                accept="image/*"
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    form.setValue("profile_image", e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          <Input
            {...form.register("phone")}
            endContent={
              <PhoneIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            errorMessage={form.formState.errors.phone?.message}
            isInvalid={!!form.formState.errors.phone}
            label="Contact No."
            placeholder="9xxxxxxxxx"
            radius="sm"
            size="lg"
            startContent={"+63"}
            type="number"
            variant="faded"
          />
          <div className="flex space-x-2">
            <Input
              isReadOnly
              defaultValue="Philippines"
              label="Country"
              radius="sm"
              size="lg"
              variant="faded"
            />

            <Autocomplete
              errorMessage={form.formState.errors.province?.message}
              isInvalid={!!form.formState.errors.province}
              isLoading={pronvinceLoading}
              label="Select a province"
              radius="sm"
              size="lg"
              variant="faded"
              onSelectionChange={(val) => {
                setSelectedProvinceCode(val);
                val &&
                  form.setValue("province", getProvinceName(provinces, val));
              }}
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
              errorMessage={form.formState.errors.municipality?.message}
              isInvalid={!!form.formState.errors.municipality}
              isLoading={municipalityLoading}
              label="Select city or municipality"
              radius="sm"
              size="lg"
              variant="faded"
              onSelectionChange={(key) => {
                setSelectedMunicipalityCode(key);
                municipalities &&
                  key &&
                  form.setValue(
                    "municipality",
                    getMunicipalityName(municipalities, key),
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
              errorMessage={form.formState.errors.brgy?.message}
              isInvalid={!!form.formState.errors.brgy}
              isLoading={brgyLoading}
              label="Select a barangay"
              radius="sm"
              size="lg"
              variant="faded"
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
              errorMessage={form.formState.errors.street?.message}
              isInvalid={!!form.formState.errors.street}
              label="Street"
              radius="sm"
              size="lg"
              variant="faded"
            />
            <Input
              {...form.register("zipcode")}
              errorMessage={form.formState.errors.zipcode?.message}
              isInvalid={!!form.formState.errors.zipcode}
              label="Zip Code"
              radius="sm"
              size="lg"
              variant="faded"
            />
          </div>

          <Button
            className="w-full"
            color="primary"
            isDisabled={isLoading}
            isLoading={isLoading}
            radius="sm"
            size="lg"
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
