'use client'

import { EditIcon } from "@/components/icons/edit"
import { useUpdateNameMutation } from "@/redux/features/accountApiSlice"
import { UserSchema } from "@/schemas/user-schemas"
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


type Props ={
    user:z.infer<typeof UserSchema>
}
export const ChangeName = ({user}:Props) => {
    const [updateName,{isSuccess, isError, isLoading}] = useUpdateNameMutation()
    const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure()
    const {setValue, handleSubmit, register,reset, formState:{errors}} = useForm<z.infer<typeof NameSchema>>({resolver:zodResolver(NameSchema)})


    const onSubmit = async (data:z.infer<typeof NameSchema>) => {
        await updateName(data).unwrap()
        reset()
        onClose()
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success("Your name updated successfully.")
        }
        if(isError){
            toast.error("Changing name failed. Please try again.p")
        }
    },[isSuccess, isError])

    return (
        <>
              <EditIcon className="hover:cursor-pointer hover:text-blue-500" onClick={onOpen}/>
                <Modal isDismissable={false} classNames={{base:''}} isOpen={isOpen} onOpenChange={()=>{onOpenChange(); reset()}}>
                    <ModalContent>
                        <ModalHeader>Edit Full Name</ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-2">
                                    <input style={{display:"none"}}/>
                                    <Input {...register("first_name")} isInvalid={!!errors.first_name} errorMessage={errors.first_name?.message} radius="sm" size="lg" label="Enter new first name" defaultValue={user.first_name}/>
                                    <Input {...register('last_name')} isInvalid={!!errors.last_name} errorMessage={errors.last_name?.message} radius="sm" size="lg" label="Enter new last name" defaultValue={user.last_name}/>
                                </div>
                                <div className="flex items-center my-4 gap-2 justify-end">
                                    <Button radius="sm" type="button" startContent={<MdCancel />}>Cancel</Button>
                                    <Button isLoading={isLoading} isDisabled={isLoading} radius="sm" color="primary" type="submit" startContent={<FaSave/>}> Save</Button>
                                </div>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
        </>
    )

}


const NameSchema = z.object({
    first_name:z.string().min(1, 'First name cannot be empty.'),
    last_name:z.string().min(1, 'Last name cannot be empty.')
})
