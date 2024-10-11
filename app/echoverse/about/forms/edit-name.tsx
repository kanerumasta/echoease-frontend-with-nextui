'use client'

import { EditIcon } from "@/components/icons/edit"
import { ArtistInSchema } from "@/schemas/artist-schemas"
import { GenderSchema } from "@/schemas/user-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { Input } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal"
import { useForm } from "react-hook-form"
import { HiDotsVertical } from "react-icons/hi"
import { z } from "zod"

const NameSchema = z.object({
    first_name: z
    .string()
    .regex(/^[A-Za-z]+$/, "First name should contain only letters"),
    last_name: z
    .string()
    .regex(/^[A-Za-z]*$/, "Last name should contain only letters"),
})

export const EditPersonalDetails = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {
    const {handleSubmit, register} = useForm<z.infer<typeof NameSchema>>({resolver:zodResolver(NameSchema)})
    return <>
        <Button isIconOnly>
            <EditIcon />
        </Button>
        <Modal>
            <ModalContent>
                <ModalHeader>
                    Edit Personal Details
                </ModalHeader>
                <ModalBody>
                    <form>
                        <Input {...register('first_name')} label="First Name" defaultValue={artist.user.first_name}/>
                        <Input {...register('last_name')} label="Last Name" defaultValue={artist.user.last_name}/>


                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}
