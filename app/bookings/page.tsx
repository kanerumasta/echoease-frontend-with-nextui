"use client";

import useLoginRequired from "@/hooks/use-login-required";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useFetchMyBookingsQuery } from "@/redux/features/bookingApiSlice";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  const {
    data: bookings,
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = useFetchMyBookingsQuery();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useFetchCurrentUserQuery();
  console.log(bookings);
  useLoginRequired("/bookings");
  if (isCurrentUserLoading || isBookingsLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1>Bookings</h1>
      <div>
        {/* {isBookingsLoading && <Spinner color="primary" />} */}
        <Table>
          <TableHeader>
            <TableColumn>ECHOEE</TableColumn>
            <TableColumn>EVENT</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>TIME</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody items={bookings ? bookings : []}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative w-[150px] h-[150px]">
                    <div className=" w-[150px] h-[150px] overflow-hidden rounded-lg">
                      <img
                        className="w-full h-full object-cover"
                        width={100}
                        src={`${process.env.NEXT_PUBLIC_HOST}${item.artist.user.profile?.profile_image}`}
                      />
                    </div>
                    <div className="absolute -top-2 -right-10 z-50 bg-blue-400 p-2 rounded-full">
                      <p className="capitalize">{item.artist.user.fullname}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.event_name}</TableCell>
                <TableCell>{item.formatted_event_date}</TableCell>
                <TableCell>{item.formatted_event_time}</TableCell>
                <TableCell>
                  <Button onPress={() => router.push(`/bookings/${item.id}`)}>
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
