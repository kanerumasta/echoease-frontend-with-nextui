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
import { Pagination } from "@nextui-org/pagination"
import { User } from "@nextui-org/user"

export const PendingBookings = () => {

    const { data: pendingBookings=[], isLoading } = useFetchPendingBookingsQuery()
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
    <Table classNames={{wrapper:'bg-transparent min-h-[250px]', td:'text-center', th:'text-center bg-white/5'}} >
        <TableHeader className="bg-transparent text-white/50">
            <TableColumn>Echoer</TableColumn>
            <TableColumn>Event</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Time</TableColumn>
            <TableColumn>Reference</TableColumn>
        </TableHeader>
        <TableBody loadingContent={<Spinner />} emptyContent={'No bookings yet'} loadingState={loadingState} items={pendingBookings}>
            {(item)=>(
                <TableRow onClick={()=>handleRowClick(item)} className="hover:cursor-pointer text-center my-2 bg-slate-100/5 h-[100px] hover:bg-white/10" key={item.id}>
                    <TableCell className="capitalize" >
                        <User name={item.client.fullname} avatarProps={{src:`${process.env.NEXT_PUBLIC_HOST}${item.client.profile?.profile_image}`}}/>
                    </TableCell>
                    <TableCell className="capitalize">{item.event_name}</TableCell>
                    <TableCell>{item.formatted_event_date}</TableCell>
                    <TableCell className="text-white/50 text-xs ">{item.formatted_start_time} - {item.formatted_end_time}</TableCell>

                    <TableCell>{item.booking_reference}</TableCell>
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
