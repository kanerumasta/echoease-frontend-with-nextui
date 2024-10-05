'use client'

import useIsArtistOnly from "@/hooks/use-is-artist-only"
import useLoginRequired from "@/hooks/use-login-required"
import { useFetchMyBookingsQuery } from "@/redux/features/bookingApiSlice"
import { Spinner } from "@nextui-org/spinner"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { notFound, useRouter } from "next/navigation"

export default function BookingsPage(){
    const {data:myBookings = [], isLoading, isError} = useFetchMyBookingsQuery()
    const { loginChecked } = useLoginRequired("/echoverse");
    const { isArtist, isLoading: artistLoading } = useIsArtistOnly();

    // login and isArtist checking
    if (!loginChecked || artistLoading) {
        return <div>Loading...</div>;
    }

    if (!artistLoading && !isArtist) {
        return notFound();
    }
    const loadingState = isLoading ? 'loading' :'idle'
    const router = useRouter()

    return <div className="mt-12">
        <Table classNames={{tr:"hover:cursor-pointer hover:bg-white/5"}} onRowAction={(key)=>router.push(`/echoverse/bookings/${key.toString()}`)}>
            <TableHeader>
                <TableColumn>Booking Reference</TableColumn>
                <TableColumn>Event</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Time</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Echoer</TableColumn>
            </TableHeader>
            <TableBody loadingContent={<Spinner />} emptyContent={'No bookings yet'} loadingState={loadingState} items={myBookings}>
                {(item)=>(
                    <TableRow className="hover:cursor-pointer" key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.event_name}</TableCell>
                        <TableCell>{item.formatted_event_date}</TableCell>
                        <TableCell>{item.formatted_event_time}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell className="capitalize" >{item.client.fullname}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>

    </div>
}
