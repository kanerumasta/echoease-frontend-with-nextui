'use client'

import { useFetchPendingBookingsQuery } from "@/redux/features/bookingApiSlice"
import { Spinner } from "@nextui-org/spinner"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"

export default function NewBookings(){
    const {data:bookings = [], isLoading} = useFetchPendingBookingsQuery()

    return <div>
       <Table  radius="sm" classNames={{td:"text-xs"}}>
        <TableHeader >
            <TableColumn>Event</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Echoer</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'Your bookings is empty.'} loadingContent={<Spinner />} loadingState={isLoading ? 'loading':'idle'} items={bookings}  >
            {(item)=>(
                <TableRow key={item.id}>
                    <TableCell>{item.event_name}</TableCell>
                    <TableCell>{item.formatted_event_date}</TableCell>
                    <TableCell>{item.client.fullname}</TableCell>
                </TableRow>
            )}
        </TableBody>
       </Table>
    </div>

}
