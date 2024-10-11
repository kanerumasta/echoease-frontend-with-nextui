"use client";

import EchoLoading from "@/components/echo-loading";
import { SearchIcon } from "@/components/icons";
import useLoginRequired from "@/hooks/use-login-required";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useFetchApprovedBookingsQuery, useFetchAwaitingDownpaymentBookingsQuery, useFetchMyBookingsQuery, useFetchUpcomingEventsQuery } from "@/redux/features/bookingApiSlice";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { notFound, useRouter } from "next/navigation";
import { AwaitingDownpayments } from "./components/awaiting-downpayment";
import UpcomingBookings from "./components/upcoming-bookings";
import { BookingHistory } from "./components/booking-history";
import { UserRoles } from "@/config/constants";
import PendingPayments from "./components/pending-payments";


export default function BookingPage() {
  const router = useRouter();
  const {
    data: bookings,
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = useFetchMyBookingsQuery();

  const {data:upcomingBookings} = useFetchUpcomingEventsQuery()
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useFetchCurrentUserQuery();
  useLoginRequired("/bookings");
  if (isCurrentUserLoading || isBookingsLoading) {
    return <EchoLoading />
    }
    if (currentUser && currentUser.role === UserRoles.artist) {
        return notFound()
    }
  return (
      <div>
        <h1 className="text-center text-4xl font-bold mb-10 text-white/80">Bookings</h1>
        <Input placeholder="Search..." radius="full" classNames={{mainWrapper:"md:w-2/6"}}  endContent={<SearchIcon />} size="lg"/>
          <Spacer y={6} />
          <div className="flex w-full gap-2 ">
        {upcomingBookings &&
                <div className="bg-white/5 lg:max-w-2/6 lg:min-w-2/6 max-h-[90vh] mb-2 p-4 space-y-2 rounded-md">
                    <h1 className="text-lg mb-3 text-white/40">Upcoming Events</h1>
                    <UpcomingBookings bookings={upcomingBookings}/>
                </div>}

         <div className="w-full">

        <AwaitingDownpayments />
        <PendingPayments />

        <Spacer y={2}/>


         </div>
          </div>
         <div className="bg-white/5 w-full p-4 rounded-md">
            <h1 className="text-xl mb-4 text-center text-white/30">Booking History</h1>
            <BookingHistory />
        </div>


          <Spacer y={8} />

    </div>
  );
}
