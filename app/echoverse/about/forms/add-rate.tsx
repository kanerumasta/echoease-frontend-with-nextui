import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Spacer } from "@nextui-org/spacer"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useAddArtistRatesMutation } from "@/redux/features/artistApiSlice"
import { ArtistInSchema } from "@/schemas/artist-schemas"

const RateSchema = z.object({
    name:z.string().min(1, 'Rate name is required.'),
    description:z.string(),
    amount: z.string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 100, { message: "Amount must be a valid number greater than 0" }),
})

export const AddRate = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {

    const [addArtistRates,{isLoading}] = useAddArtistRatesMutation()
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()

    const {handleSubmit, register,formState:{errors},reset} = useForm<z.infer<typeof RateSchema>>({resolver:zodResolver(RateSchema)})

    const onSubmit = async (data:z.infer<typeof RateSchema>) => {
        const payload = {
            name : data.name,
            amount : data.amount,
            description:data.description,
            artist:artist.id
        }
      await addArtistRates(payload)
      cleanUp()
    }

    const cleanUp = () => {
        reset()
        onClose()

    }

    return (
        <>
        <Button onPress={onOpen} color="primary" radius="sm">Add Rate</Button>
        <Modal aria-label="modal" isDismissable={false}  isOpen={isOpen} onOpenChange={()=>{onOpenChange();reset()}}>
            <ModalContent >
                <ModalHeader aria-label="Add rate">Add Rate</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Input aria-label="Rate" isInvalid={!!errors.name} errorMessage={errors.name?.message} {...register('name')} label="Rate"/>
                            <Textarea {...register('description')} label="Description" placeholder="Type a short description here..."/>
                            <Input aria-label="amount" label="Amount" isInvalid={!!errors.amount} errorMessage={errors.amount?.message} {...register('amount')} type="number" />
                        </div>
                        <Spacer y={4}/>
                        <div className="flex gap-2">
                            <Button radius="sm" type="button" onPress={onClose}>Cancel</Button>
                            <Button isLoading={isLoading} isDisabled={isLoading} className="bg-blue-500" radius="sm" type="submit">Add Rate</Button>
                        </div>
                    </form>
                </ModalBody>

            </ModalContent>
        </Modal>
        </>
    )
}
