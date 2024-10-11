'use client'

import { useFetchAwaitingDownpaymentBookingsQuery } from "@/redux/features/bookingApiSlice"
import { BookInSchema } from "@/schemas/booking-schemas"
import { z } from "zod"
import { BookingCard } from "./booking-card"
import Image from "next/image"
import { Button } from "@nextui-org/button"
import CustomImage from "@/components/image"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useAttachDownPaymentIntentMutation, useCreateDownPaymentIntentMutation } from "@/redux/features/paymentApiSlice"
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { useState } from "react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { HiDotsVertical } from "react-icons/hi"


export const AwaitingDownpayments = () => {
    const {data:awaitingBookings = [], isLoading} = useFetchAwaitingDownpaymentBookingsQuery()
    const {data:currentUser} = useFetchCurrentUserQuery()
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const [createDownPaymentIntent, {isLoading:creatingIntent,data}] = useCreateDownPaymentIntentMutation()
    const [attachDownPaymentIntent, {isLoading:attachingIntent}] = useAttachDownPaymentIntentMutation()

    const [clickedBooking, setClickedBooking] = useState<z.infer<typeof BookInSchema>|null>(null)

    const handlePayNowClick = async (booking:z.infer<typeof BookInSchema>) => {
        const payload = {
            "booking":booking.id
        }
        setClickedBooking(booking)
        await createDownPaymentIntent(payload)
        onOpen()
    }

    const handlePayWithMethod = async (booking:z.infer<typeof BookInSchema>, method:"gcash"|"paymaya") => {
        const payload = {
            payment_intent_id: data?.payment_intent_id,
            payment_method: method,
            booking: booking.id,
            return_url: "http://localhost:3000/pay/validate",
            email: currentUser?.email,
            name:currentUser?.fullname
        }

        console.log(payload)
        const response = await attachDownPaymentIntent(payload)

        window.location.href = response.data.url

    }


    return <>
            <div className="w-full p-4 mb-2 bg-white/5 rounded-lg">
                <h1 className="text-center text-lg text-white/40 mb-4">Awaiting Down payments</h1>
               <Table  classNames={{wrapper:'bg-transparent'}}>
                <TableHeader>
                    <TableColumn>Event</TableColumn>
                    <TableColumn>Event Date</TableColumn>
                    <TableColumn>Event Location</TableColumn>
                    <TableColumn>Event Time</TableColumn>
                    <TableColumn>Echoee</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={'Empty awaiting payments'} items={awaitingBookings} >
                    {(item)=>(
                        <TableRow key={item.id}>
                            <TableCell>{item.event_name}</TableCell>
                            <TableCell>{item.formatted_event_date}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.start_time} - {item.end_time}</TableCell>
                            <TableCell>
                                <CustomImage src={`${process.env.NEXT_PUBLIC_HOST}${item.artist.user.profile?.profile_image}`} className="rounded-full" width={"50px"} height={"50px"} /> {item.artist.user.fullname}
                            </TableCell>
                            <TableCell>
                            <Dropdown>
                                    <DropdownTrigger>
                                            <Button isIconOnly>
                                            <HiDotsVertical />
                                            </Button>
                                        </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem onClick={()=>handlePayNowClick(item)}>Pay Now</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
               </Table>
             </div>
             <Modal classNames={ {base:'bg-white text-black',header:'bg-blue-500 text-white',closeButton:'text-white hover:bg-white/30'}} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Pay Downpayment</ModalHeader>
                <ModalBody>
                    {clickedBooking &&
                    <div>
                        <h1 className="text-center font-bold text-lg">Pay with</h1>
                        <div className="fles items-center justify-center">
                            <div className="flex justify-center gap-4 p-3">
                                <div onClick={()=>handlePayWithMethod(clickedBooking, "gcash")}  className="border-3 hover:cursor-pointer hover:bg-blue-500/20 border-blue-500/50 p-3 rounded-xl">
                            <CustomImage width="100px" height="60px" src="/media/GCash-Logo.png"/>
                                </div>
                                <div onClick={()=>handlePayWithMethod(clickedBooking, "paymaya")} className="border-3 hover:cursor-pointer hover:bg-green-500/20 border-green-500/50 p-3 rounded-xl">
                            <CustomImage width="100px" height="60px" src="/media/paymaya.png"/>
                            </div>
                            </div>
                        </div>
                    </div>
}
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
}
