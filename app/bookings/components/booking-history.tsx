'use client'

import { useFetchMyBookingsQuery } from "@/redux/features/bookingApiSlice"
import { Chip } from "@nextui-org/chip"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"


export const BookingHistory = () => {
    const {data:bookingHistory=[], isLoading} = useFetchMyBookingsQuery()
    return <>
        <Table classNames={{wrapper:'rounded-md bg-transparent', base:'border-none'}}>
            <TableHeader>
                <TableColumn>Reference ID</TableColumn>
                <TableColumn>Event</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Time</TableColumn>
                <TableColumn>Echoee</TableColumn>
                <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody isLoading={isLoading} emptyContent={'No Bookings Yet.'} items={bookingHistory}>
                {(item => (
                    <TableRow key={item.id}>
                        <TableCell>{ item.id}</TableCell>
                        <TableCell>{ item.event_name}</TableCell>
                        <TableCell>{ item.formatted_event_date}</TableCell>
                        <TableCell>{ item.formatted_start_time}</TableCell>
                        <TableCell>{ item.artist.user.fullname}</TableCell>
                        <TableCell><Chip variant="flat" color={getColorByStatus(item.status)}>{ item.status}</Chip></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
}

type ColorStatus = "default" | "warning" | "danger" | "success" | "secondary" | "primary";
const getColorByStatus = (status: string):ColorStatus  => {

    let color:ColorStatus = 'default'
    switch (status) {
        case 'approved':
            color = 'warning'
            break;
        case 'rejected':
            color = 'danger'
            break;
        case 'completed':
            color = 'success'
            break;
        case 'awaiting_downpayment':
            color ='secondary'
        default:
            color = 'default'
            break;
    }

    return color

}
