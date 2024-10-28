"use client";

import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { useFetchPendingBookingsQuery } from "@/redux/features/bookingApiSlice";

export default function NewBookings() {
  const { data: bookings = [], isLoading } = useFetchPendingBookingsQuery();

  return (
    <div>
      <Table classNames={{ td: "text-xs" }} radius="sm">
        <TableHeader>
          <TableColumn>Event</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Echoer</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"Your bookings is empty."}
          items={bookings}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.event_name}</TableCell>
              <TableCell>{item.formatted_event_date}</TableCell>
              <TableCell>{item.client.fullname}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
