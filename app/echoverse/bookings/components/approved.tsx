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

import { useFetchAwaitingDownpaymentBookingsQuery } from "@/redux/features/bookingApiSlice";

export const ApprovedBookings = () => {
  const { data: bookings = [], isLoading } =
    useFetchAwaitingDownpaymentBookingsQuery();
  const loadingState = isLoading ? "loading" : "idle";

  return (
    <div className="p-4 rounded-md bg-white/5">
      <h1 className="mb-4 text-white/40 text-center text-lg">
        Waiting For Down payments
      </h1>
      <Table
        classNames={{
          wrapper: "bg-transparent",
          tr: "hover:cursor-pointer hover:bg-white/5",
        }}
      >
        <TableHeader>
          <TableColumn>Booking Reference</TableColumn>
          <TableColumn>Event</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Echoer</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No bookings yet"}
          items={bookings}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.id} className="hover:cursor-pointer">
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.event_name}</TableCell>
              <TableCell>{item.formatted_event_date}</TableCell>
              <TableCell>{item.formatted_start_time}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="capitalize">
                {item.client.fullname}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
