"use client";

import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useState } from "react";
import { Pagination } from "@nextui-org/pagination";

import { useFetchMyBookingsQuery } from "@/redux/features/bookingApiSlice";

export const BookingHistory = () => {
  const [page, setPage] = useState(1);
  const { data: bookingHistory, isLoading } = useFetchMyBookingsQuery(page);

  return (
    <>
      <Table
        aria-label="bookings table"
        bottomContent={
          bookingHistory?.total_pages && bookingHistory.total_pages > 1 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={bookingHistory?.current_page ?? 1}
                total={bookingHistory?.total_pages ?? 1}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "rounded-md bg-transparent",
          base: "border-none",
        }}
      >
        <TableHeader>
          <TableColumn>Reference ID</TableColumn>
          <TableColumn>Event</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Echoee</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No Bookings Yet."}
          isLoading={isLoading}
          items={bookingHistory?.results ? bookingHistory.results : []}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.booking_reference}</TableCell>
              <TableCell>{item.event_name}</TableCell>
              <TableCell>{item.formatted_event_date}</TableCell>
              <TableCell>{item.formatted_start_time}</TableCell>
              <TableCell>{item.artist.user.fullname}</TableCell>
              <TableCell>
                <Chip color={getColorByStatus(item.status)} variant="flat">
                  {item.status}
                </Chip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

type ColorStatus =
  | "default"
  | "warning"
  | "danger"
  | "success"
  | "secondary"
  | "primary";
const getColorByStatus = (status: string): ColorStatus => {
  let color: ColorStatus = "default";

  switch (status) {
    case "approved":
      color = "warning";
      break;
    case "rejected":
      color = "danger";
      break;
    case "completed":
      color = "success";
      break;
    case "awaiting_downpayment":
      color = "secondary";
    default:
      color = "default";
      break;
  }

  return color;
};
