import { EditIcon } from "@/components/icons/edit"
import PhoneIcon from "@/components/icons/phone"
import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { FaSave } from "react-icons/fa"
import { MdCancel } from "react-icons/md"
import { toast } from "react-toastify"
import { z } from "zod"

export const ChangePhone = () => {
    const {register, handleSubmit,reset, formState:{errors}} = useForm<z.infer<typeof PhoneSchema>>
    ({resolver:zodResolver(PhoneSchema)})

    const [updateProfile,{isSuccess, isError}] = useUpdateProfileMutation()
    const  {onClose, onOpen, onOpenChange, isOpen} = useDisclosure()
    const onSubmit = async (data:z.infer<typeof PhoneSchema>) => {
        await updateProfile(data).unwrap()
        reset()
        onClose()
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success("Phone number updated successfully.")
        }
        if(isError){
            toast.error("Failed updating your phone number. Please try again.")
        }
    },[isSuccess, isError])

    return (
        <>
        <EditIcon onClick={onOpen}/>
        <Modal isOpen={isOpen} onOpenChange={()=>{reset();onOpenChange()}}>
            <ModalContent>
                <ModalHeader>Edit Phone Number</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input isInvalid={!!errors.phone} startContent={'+63'} errorMessage={errors.phone?.message} type="number" {...register('phone')} label="New Phone Number" placeholder="9xxxxxxxxx" radius="sm" size="lg" endContent={<PhoneIcon />}/>
                        </div>
                        <div className="my-4 flex items-center justify-end gap-2">
                            <Button type="button" radius="sm" size="lg" startContent={<MdCancel />} onClick={()=>{reset(); onClose()}}>Cancel</Button>
                            <Button type="submit" radius="sm" size="lg" startContent={<FaSave/>} color="primary">Save</Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

const PhoneSchema = z.object({
    phone: z
    .string()
    .length(10, { message: "Phone number must be 10 digits long" })
    .regex(/^9\d{9}$/, { message: "Phone number format is invalid." }),
})
