'use client'


import { useRejectBookingMutation } from "@/redux/features/bookingApiSlice"
import { Button } from "@nextui-org/button"
import { Textarea } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useState } from "react"
import { toast } from "react-toastify"

type DeclineBookingProps = {
    bookingId : number
}
export const DeclineBooking:React.FC<DeclineBookingProps> = ({bookingId}) => {
    const [rejectBooking,{isLoading}] = useRejectBookingMutation()
    const [reason, setReason] = useState("")
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const handleDecline =async () => {
        const payload = {
            bookingId : bookingId,
            reason: reason
        }
        await rejectBooking(payload).unwrap()
        toast.success("Booking has been declined.")
        onClose()
    }
    return <>
        <Button color="danger" radius="sm" isLoading={isLoading} onPress={onOpen} >Decline Booking</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    <p>Decline this Booking</p>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-2">
                        <p className="text-white/50 text-sm">Please let your echoer know why you are declining this booking. </p>
                        <Textarea radius="sm" variant="bordered" onChange={(e)=>setReason(e.target.value)} label="Decline Reason" placeholder="State your reason for declining here..."/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={isLoading} color="danger" radius="sm" onPress={handleDecline}>Confirm</Button>
                    <Button radius="sm" onPress={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}
