import { EditIcon } from "@/components/icons/edit";
import { useEditArtistRateMutation } from "@/redux/features/artistApiSlice";
import { RateSchema } from "@/schemas/artist-schemas";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Spacer } from "@nextui-org/spacer";
import { Tooltip } from "@nextui-org/tooltip";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Schema = z.object({
    name:z.string().min(1, 'Rate name is required.'),
    description:z.string(),
    amount: z.string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 100, { message: "Amount must be a valid number greater than 0" }),
})


export const EditRate = ({rate}:{rate:z.infer<typeof RateSchema>}) => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const {handleSubmit, reset, formState:{errors}, register} = useForm<z.infer<typeof Schema>>()
    const [editArtistRate,{isLoading}] = useEditArtistRateMutation()
    const onSubmit = async(data:z.infer<typeof Schema>) => {
        const payload = {
            id:rate.id,
            name:data.name,
            description:data.description,
            amount:data.amount
        }

        await editArtistRate(payload)
        reset()
        onClose()

    }
    return (
        <>
        <Tooltip  delay={1000} color="success" content="Edit Rate">
            <Button onPress={onOpen} variant="flat" color="success" isIconOnly>
                <EditIcon className="text-lg"/>
            </Button>
        </Tooltip>
        <Modal isOpen={isOpen} onOpenChange={()=>{onOpenChange();reset();}}>
            <ModalContent>
                <ModalHeader>
                    Edit Rate
                </ModalHeader>
                <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Input defaultValue={rate.name} aria-label="Rate" isInvalid={!!errors.name} errorMessage={errors.name?.message} {...register('name')} label="Rate"/>
                            <Textarea defaultValue={rate.description||''} {...register('description')} label="Description" placeholder="Type a short description here..."/>
                            <Input defaultValue={rate.amount.toString()} aria-label="amount" label="Amount" isInvalid={!!errors.amount} errorMessage={errors.amount?.message} {...register('amount')} type="number" />
                        </div>
                        <Spacer y={4}/>
                        <div className="flex gap-2">
                            <Button radius="sm" type="button" onPress={onClose}>Cancel</Button>
                            <Button className="bg-blue-500" radius="sm" type="submit">Update</Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>

        </>
    )
}
