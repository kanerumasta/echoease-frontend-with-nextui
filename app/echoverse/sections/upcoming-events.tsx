'use client'

import { useFetchApprovedBookingsQuery } from "@/redux/features/bookingApiSlice"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import { Spinner } from "@nextui-org/spinner"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"

export default function UpcomingEvents(){
    const {data:upcomingEventsData = [], isLoading} = useFetchApprovedBookingsQuery()
    const loadingState = isLoading ? 'loading' : 'idle'

    return <div className="h-full">
  <Table radius="sm" classNames={{td:"text-xs"}}>
        <TableHeader >
            <TableColumn>Event</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Echoer</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No upcoming events.'} loadingContent={<Spinner />} loadingState={isLoading ? 'loading':'idle'} items={upcomingEventsData}  >
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
