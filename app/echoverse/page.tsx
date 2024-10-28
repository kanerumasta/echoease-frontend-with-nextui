"use client";

import Link from "next/link";
import { notFound } from "next/navigation";

import useIsArtistOnly from "@/hooks/use-is-artist-only";
import useLoginRequired from "@/hooks/use-login-required";
import {
  useFetchPendingBookingsQuery,
  useFetchUpcomingEventsQuery,
} from "@/redux/features/bookingApiSlice";
import { cn } from "@/lib/utils";

import NewBookings from "./sections/bookings";
import { ConnectionRequests } from "./sections/connection-requests";
import UpcomingEvents from "./sections/upcoming-events";

//Artist Profile Page

export default function EchoversePage() {
  const { loginChecked } = useLoginRequired("/echoverse");
  const { isArtist, isLoading, isError } = useIsArtistOnly();
  const { data: newBookings = [] } = useFetchPendingBookingsQuery();
  const { data: upcomingEvents = [] } = useFetchUpcomingEventsQuery();

  //login and isartist checking
  if (!loginChecked || isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !isArtist) {
    return notFound();
  }

  return (
    <div className="space-y-2">
      <div className="md:flex md:gap-2 space-y-2 md:space-y-0">
        <div className="p-3 bg-white/10 flex flex-wrap gap-4 rounded-lg h-[300px] w-full ">
          <EchoverseMenu
            color="bg-blue-500"
            count={upcomingEvents.length}
            href="/echoverse/upcoming-events"
            title="Upcoming Events"
          />
          <EchoverseMenu
            color="bg-purple-500"
            count={newBookings.length}
            href="/echoverse/bookings"
            title={newBookings.length === 1 ? "New Booking" : "New Bookings"}
          />
        </div>
        <div className="p-3 bg-white/10 rounded-lg h-[300px] w-full md:w-2/6">
          <ConnectionRequests />
        </div>
      </div>
      <div className="md:flex md:gap-2 space-y-2 md:space-y-0">
        <div className="w-full md:w-2/4 bg-white/10 rounded-lg min-h-[200px] p-3">
          <p>Booking Inquiries</p>
          <NewBookings />
        </div>
        <div className="w-full md:w-2/4 bg-white/10 rounded-lg min-h-[200px] p-3">
          <p>Upcoming Events</p>
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}

type EchoverseMenuProps = {
  count: number;
  title: string;
  href: string;
  color: string;
};
const EchoverseMenu = ({ title, count, href, color }: EchoverseMenuProps) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          `w-[250px] shadow-sm shadow-white gap-3 p-4 h-[150px] rounded-md flex items-center`,
          color,
        )}
      >
        <div className="text-white text-2xl">{title}</div>
        {count > 0 && (
          <div className="text-white text-5xl w-14 flex items-center justify-center h-14 bg-white/5">
            {count}
          </div>
        )}
      </div>
    </Link>
  );
};
