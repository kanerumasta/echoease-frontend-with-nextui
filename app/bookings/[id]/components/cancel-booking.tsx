'use client'

import { useCancelBookingMutation } from "@/redux/features/bookingApiSlice"
import { BookInSchema } from "@/schemas/booking-schemas"
import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { z } from "zod"


type CancelBookingProps = {
    booking: z.infer<typeof BookInSchema>
}
export const CancelBooking:React.FC<CancelBookingProps> = ({booking}) => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const [cancelBooking, {isLoading, isSuccess}] = useCancelBookingMutation()
    const [cancelReason, setCancelReason] = useState("")

    const handleCancel = async () => {
        const payload = {
            bookingId:booking.id,
            reason : cancelReason,
        }
        await cancelBooking(payload)
        onClose()
    }
    useEffect(()=>{
        if(isSuccess)
        {
            toast.success("Booking cancelled!")
            onClose()
        }
    },[isSuccess])
    return <>
        <Button onPress={onOpen} color="warning" radius="sm">Cancel</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                        Add Cancellation Policy HERE
                </ModalHeader>
                <ModalBody>
                    <div>
                        <p>Do you want to cancel your booking for {booking.artist.user.fullname} {booking.booking_reference} ?</p>
                        {/* Add cancellation policy here */}
                        <Textarea radius="sm" variant="bordered" onChange={(e)=>setCancelReason(e.target.value)} label="Reaoson of Cancellation" placeholder="Please let your echoee know the reason of cancellation."/>

                    </div>
                    <Button onPress={handleCancel} color="warning" radius="sm">Proceed Cancel</Button>
                    <Button isLoading={isLoading} onPress={onClose} radius="sm">No</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}
