import { DeleteIcon } from "@/components/icons/delete"
import { useDeleteArtistRateMutation } from "@/redux/features/artistApiSlice"
import { RateSchema } from "@/schemas/artist-schemas"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Tooltip } from "@nextui-org/tooltip"
import { z } from "zod"

export const DeleteRate = ({rate}:{rate:z.infer<typeof RateSchema>}) => {
    const [deleteArtist,{isLoading}] = useDeleteArtistRateMutation()
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const deleteRate =async ( ) => {
        await deleteArtist(rate.id.toString())
        onClose()
    }
    return (
        <>
             <Tooltip delay={1000} color="danger" content="Delete Rate">
                <Button onPress={onOpen} variant="flat" color="danger" isIconOnly>
                    <DeleteIcon className="text-lg"/>
                </Button>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Delete Rate</ModalHeader>
                    <ModalBody>
                        <h1>Do you want to delete this rate?</h1>
                        <p className="text-xs text-white/40">This action cannot be undone</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={onClose} radius="sm" variant="bordered">No</Button>
                        <Button onPress={deleteRate} radius="sm" color="danger" variant="bordered">Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
</>
    )
}
