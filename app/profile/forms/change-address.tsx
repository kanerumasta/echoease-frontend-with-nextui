import { EditIcon } from "@/components/icons/edit";
import useFetchAddresses from "@/hooks/utils/use-fetch-addresses";
import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { z } from "zod";

export const ChangeAddress = () => {
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<any>(null);
    const [updateProfile,{isSuccess, isError,isLoading}] = useUpdateProfileMutation()
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
}, [])
    useEffect(() => {
        if (selectedProvinceCode) {
        fetchMunicipalities(selectedProvinceCode);
        }
        if (selectedMunicipalityCode) {
        fetchBarangays(selectedMunicipalityCode);
        }
    }, [selectedProvinceCode, selectedMunicipalityCode]);


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

  const form = useForm<z.infer<typeof AddressSchema>>({resolver:zodResolver(AddressSchema)})
  const {onOpen, onOpenChange, isOpen, onClose} = useDisclosure()

  const onSubmit = async (data:z.infer<typeof AddressSchema>) =>{
    const validatedData = AddressSchema.safeParse(data)
    if (validatedData.success){
    await updateProfile(data).unwrap()
    form.reset()
    onClose()
    }else{
        toast.error('Invalid address data')
    }
  }
  useEffect(()=>{
    if(isSuccess){
        toast.success("Address successfully updated.")
    }
    if(isError){
        toast.error("Updating address failed. Please try again")
    }
  },[isSuccess, isError])

    return (
        <>
        <EditIcon className="hover:text-blue-500 hover:cursor-pointer" onClick={onOpen}/>
        <Modal isOpen={isOpen} onOpenChange={()=>{onOpenChange();form.reset()}} isDismissable={false}>
            <ModalContent>
                <ModalHeader>Edit Address</ModalHeader>
                <ModalBody>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                    <Autocomplete
                    isInvalid={!!form.formState.errors.province}
                    errorMessage={form.formState.errors.province?.message}
                    radius="sm"
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
                    <Autocomplete
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
                    <Input
                    {...form.register("street")}
                    variant="faded"
                    isInvalid={!!form.formState.errors.street}
                    errorMessage={form.formState.errors.street?.message}
                    label="Street"
                    radius="sm"
                    />
                    <Input
                    {...form.register("zipcode")}
                    variant="faded"
                    label="Zip Code"
                    isInvalid={!!form.formState.errors.zipcode}
                    errorMessage={form.formState.errors.zipcode?.message}
                    radius="sm" />
                    <div className="flex items-center gap-2 my-4 justify-end">
                        <Button onPress={()=>{onClose(); form.reset()}} type="button" radius="sm" startContent={<MdCancel />}>Cancel</Button>
                        <Button isLoading={isLoading} isDisabled={isLoading} type="submit" radius="sm" color="primary" startContent={<FaSave />}>Save</Button>
                    </div>

                    </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}


const AddressSchema = z.object({
    brgy:z.string({'message':'Barangay field is required'}).min(1,'Barangay field is required'),
    municipality:z.string({'message':'Municipality field is required'}).min(1,'Municipality field is required'),
    province:z.string({'message':'Province field is required'}).min(1,'Province field is required'),
    street:z.string().min(1,'Please provide your street.'),
    zipcode:z.string().min(1, 'Please provide your address zipcode.')
})
