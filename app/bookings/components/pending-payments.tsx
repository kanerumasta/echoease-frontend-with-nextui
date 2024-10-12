'use client'

import { useFetchPendingPaymentsQuery } from "@/redux/features/bookingApiSlice"
import { Button } from "@nextui-org/button"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { useState } from "react"
import { HiDotsVertical } from "react-icons/hi"

export default function PendingPayments (){

    const {data:pendingPayments=[], isLoading} = useFetchPendingPaymentsQuery()
    const [clickedBooking, setClickedBooking] = useState(null)

    const handlePayNowClick = () => {

    }

    return (
        <div className="p-4 rounded-lg bg-white/5">
            <h1 className="text-center mb-4 text-lg text-white/40">Pending Payments</h1>
            <Table classNames={{wrapper:'bg-trasparent'}}>
                <TableHeader
                >
                    <TableColumn>Event</TableColumn>
                    <TableColumn>Event Date</TableColumn>
                    <TableColumn>Event Location</TableColumn>
                    <TableColumn>Artist</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={'No pending payments yet.'} items={pendingPayments} isLoading={isLoading}>
                    {(booking)=>(
                        <TableRow key={booking.id}>
                            <TableCell>{booking.event_name}</TableCell>
                            <TableCell>{booking.formatted_event_date}</TableCell>
                            <TableCell>{booking.event_location}</TableCell>
                            <TableCell>{booking.artist.user.fullname}</TableCell>
                            <TableCell>
                                <Dropdown>
                                    <DropdownTrigger>
                                       <Button isIconOnly> <HiDotsVertical /></Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem onClick={handlePayNowClick}>Pay Now</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </TableCell>


                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
