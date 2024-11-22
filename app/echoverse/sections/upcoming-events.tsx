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

import { useFetchUpcomingEventsQuery } from "@/redux/features/bookingApiSlice";

export default function UpcomingEvents() {
  const { data: upcomingEventsData = [], isLoading } =
    useFetchUpcomingEventsQuery();
  const loadingState = isLoading ? "loading" : "idle";

  console.log(upcomingEventsData);

  return (
    <div className="h-full">
      <Table classNames={{ td: "text-xs", wrapper: "bg-black/50" }} radius="sm">
        <TableHeader>
          <TableColumn>Event</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Echoer</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No upcoming events."}
          items={upcomingEventsData}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.event_name}</TableCell>
              <TableCell>{item.formatted_event_date}</TableCell>
              <TableCell>
                {item.formatted_start_time} - {item.formatted_end_time}
              </TableCell>
              <TableCell>{item.client.fullname}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
