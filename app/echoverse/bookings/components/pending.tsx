'use client'

import { BookInSchema } from "@/schemas/booking-schemas"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/chip"
import { Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/modal"
import { Spinner } from "@nextui-org/spinner"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { z } from "zod"
import { useConfirmBookingMutation, useFetchPendingBookingsQuery } from "@/redux/features/bookingApiSlice"
import { useRejectBookingMutation } from "@/redux/features/bookingApiSlice"

export const PendingBookings = () => {
    const { data: pendingBookings = [], isLoading } = useFetchPendingBookingsQuery()
    const [clickedBooking, setClickedBooking] = useState<z.infer<typeof BookInSchema>|null>(null)
    const loadingState = isLoading ? 'loading' :'idle'
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
    const [declineBooking,{isLoading:isDeclining}] = useRejectBookingMutation()
    const [confirmBooking ,{isLoading:isConfirming, isError:isConfirmError, isSuccess:isConfirmed}] = useConfirmBookingMutation()

    const handleRowClick = (booking: z.infer<typeof BookInSchema>) => {
        setClickedBooking(booking);
        onOpen();
    };

    const closeModal = () => {
        onClose();
        setClickedBooking(null);
    };

    const handleConfirm = async (booking:z.infer<typeof BookInSchema>) => {
        await confirmBooking(booking.id.toString()).unwrap()
        closeModal()

    }
    const handleDecline = async (booking:z.infer<typeof BookInSchema>) => {
        await declineBooking(booking.id.toString()).unwrap()
        closeModal()
    }

    useEffect(()=>{
        if(isConfirmed){
            toast.success("Booking is successfully confirmed. We will wait for client's downpayment and then process your booking.")
        }
        if(isConfirmError){
            toast.error("Oops!. We are so sorry for failing your confirmation. Please try again and if still failed jus t dont be shy to contact our team.")
        }
    },[isConfirmed, isConfirmError])


    return <div className="p-4 rounded-lg bg-white/5 ">
        <h1 className="text-center mb-4 text-white/40 text-lg">Pending Bookings</h1>
    <Table classNames={{wrapper:'bg-transparent min-h-[250px]',tr:"hover:cursor-pointer hover:bg-white/5"}} >
        <TableHeader>
            <TableColumn>Booking Reference</TableColumn>
            <TableColumn>Event</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Time</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Echoer</TableColumn>
        </TableHeader>
        <TableBody loadingContent={<Spinner />} emptyContent={'No bookings yet'} loadingState={loadingState} items={pendingBookings}>
            {(item)=>(
                <TableRow onClick={()=>handleRowClick(item)} className="hover:cursor-pointer" key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.event_name}</TableCell>
                    <TableCell>{item.formatted_event_date}</TableCell>
                    <TableCell>{item.formatted_start_time}</TableCell>
                    <TableCell><Chip color="success" variant="flat">{item.status}</Chip></TableCell>
                    <TableCell className="capitalize" >{item.client.fullname}</TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>

<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
        <ModalBody>
        {clickedBooking && (
            <div>
                <h2>Booking Details</h2>
                <p><strong>Event Name:</strong> {clickedBooking.event_name}</p>
                <p><strong>Date:</strong> {clickedBooking.formatted_event_date}</p>
                <p><strong>Start Time:</strong> {clickedBooking.formatted_start_time}</p>
                <p><strong>Status:</strong> {clickedBooking.status}</p>
                <p><strong>Client:</strong> {clickedBooking.client.fullname}</p>

            </div>
         )}

        </ModalBody>
        <ModalFooter>
            <Button color="danger"size="lg" radius="sm" isLoading={isDeclining} onPress={()=>clickedBooking && handleDecline(clickedBooking)}  >  Decline</Button>
            <Button onPress={()=>clickedBooking && handleConfirm(clickedBooking)} isLoading={isConfirming} isDisabled={isConfirming}  color="primary" size="lg" radius="sm">Confirm</Button>
        </ModalFooter>
    </ModalContent>
</Modal>
</div>
}
