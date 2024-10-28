"use client";

import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { notFound } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/tabs";

import EchoLoading from "@/components/echo-loading";
import { SearchIcon } from "@/components/icons";
import { UserRoles } from "@/config/constants";
import useLoginRequired from "@/hooks/use-login-required";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useFetchUpcomingEventsQuery } from "@/redux/features/bookingApiSlice";

import { AwaitingDownpayments } from "./components/awaiting-downpayment";
import { BookingHistory } from "./components/booking-history";
import PendingPayments from "./components/pending-payments";
import UpcomingBookings from "./components/upcoming-bookings";

export default function BookingPage() {
  const { data: upcomingBookings = [] } = useFetchUpcomingEventsQuery();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useFetchCurrentUserQuery();

  useLoginRequired("/bookings");
  if (isCurrentUserLoading) {
    return <EchoLoading />;
  }
  if (currentUser && currentUser.role === UserRoles.artist) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-10 text-white/80">Bookings</h1>
      <Input
        classNames={{ mainWrapper: "md:w-2/6" }}
        endContent={<SearchIcon />}
        placeholder="Search..."
        radius="full"
      />
      <Spacer y={6} />
      <div className="flex w-full gap-2 ">
        {upcomingBookings && (
          <div className="bg-white/5 lg:max-w-2/6 lg:min-w-2/6 max-h-[90vh] mb-2 p-4 space-y-2 rounded-md">
            <h1 className="text-lg mb-3 text-white/40">Upcoming Events</h1>
            <UpcomingBookings bookings={upcomingBookings} />
          </div>
        )}

        <div className="w-full">
          <Tabs classNames={{}} color="primary">
            <Tab key={"awaiting"} title="Awaiting Downpayments">
              <AwaitingDownpayments />
            </Tab>
            <Tab key={"pending"} title="Pending Payments">
              <PendingPayments />
            </Tab>
            <Tab key={"history"} title="Booking History">
              <BookingHistory />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
