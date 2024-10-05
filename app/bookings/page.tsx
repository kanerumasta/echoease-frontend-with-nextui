"use client";

import EchoLoading from "@/components/echo-loading";
import { SearchIcon } from "@/components/icons";
import { DeleteIcon } from "@/components/icons/delete";
import { EyeIcon } from "@/components/icons/eyeicon";
import useLoginRequired from "@/hooks/use-login-required";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useFetchApprovedBookingsQuery, useFetchMyBookingsQuery } from "@/redux/features/bookingApiSlice";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";
import UpcomingBookings from "./components/upcoming-bookings";

export default function BookingPage() {
  const router = useRouter();
  const {
    data: bookings,
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = useFetchMyBookingsQuery();

  const {data:upcomingBookings} = useFetchApprovedBookingsQuery()
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useFetchCurrentUserQuery();
  useLoginRequired("/bookings");
  if (isCurrentUserLoading || isBookingsLoading) {
    return <EchoLoading />
  }
  return (
    <div>
        <Input placeholder="Search..." radius="full" classNames={{mainWrapper:"md:w-2/6"}}  endContent={<SearchIcon />} size="lg"/>
<Spacer y={6}/>
<h1>Upcoming</h1>
      {upcomingBookings &&   <UpcomingBookings bookings={upcomingBookings}/>}
      <Spacer y={8}/>
      <h1>Bookings</h1>
      <div>
        {/* {isBookingsLoading && <Spinner color="primary" />} */}
        <Table>
          <TableHeader>
            <TableColumn>ECHOEE</TableColumn>
            <TableColumn>EVENT</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>TIME</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={<div className="space-y-4"><p>You don't have bookings yet</p><Button onClick={()=>router.push('/echoees')} color="primary" size="lg" radius="sm">Find Echoees</Button></div>} items={bookings ? bookings : []}>
            {(item) => (
              <TableRow className="capitalize"  key={item.id}>
                <TableCell>
                {item.artist.user.fullname}
                </TableCell>
                <TableCell>{item.event_name}</TableCell>
                <TableCell>{item.formatted_event_date}</TableCell>
                <TableCell>{item.formatted_event_time}</TableCell>
                <TableCell>
                    <Chip size="sm" variant="flat" color={item.status === 'approved' ? 'success' :'default'}>
                        {item.status}
                    </Chip>
                </TableCell>
                <TableCell>
                <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>

            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
