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
import { User } from "@nextui-org/user";
import { useRouter } from "next/navigation";

import { useFetchCompletedBookingsQuery } from "@/redux/features/bookingApiSlice";

export const CompleteBookings = () => {
  const { data: pendingBookings = [], isLoading } =
    useFetchCompletedBookingsQuery();
  const loadingState = isLoading ? "loading" : "idle";
  const router = useRouter();

  return (
    <div className="p-4 rounded-lg bg-white/5 ">
      <h1 className="text-center mb-4 text-white/40 text-lg">
        Upcoming Events
      </h1>
      <Table
        classNames={{
          wrapper: "bg-transparent min-h-[250px]",
          td: "text-center",
          th: "text-center bg-white/5",
        }}
        selectionMode="single"
        onRowAction={(e) => router.push(`/echoverse/bookings/${e}`)}
      >
        <TableHeader className="bg-transparent text-white/50">
          <TableColumn>Echoer</TableColumn>
          <TableColumn>Event</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Reference</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No bookings yet"}
          items={pendingBookings}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow
              key={item.id}
              className="hover:cursor-pointer text-center my-2 bg-slate-100/5 h-[100px] hover:bg-white/10"
            >
              <TableCell className="capitalize">
                <User
                  avatarProps={{
                    src: `${process.env.NEXT_PUBLIC_HOST}${item.client.profile?.profile_image}`,
                  }}
                  name={item.client.fullname}
                />
              </TableCell>
              <TableCell className="capitalize">{item.event_name}</TableCell>
              <TableCell>{item.formatted_event_date}</TableCell>
              <TableCell className="text-white/50 text-xs ">
                {item.formatted_start_time} - {item.formatted_end_time}
              </TableCell>

              <TableCell>{item.booking_reference}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
