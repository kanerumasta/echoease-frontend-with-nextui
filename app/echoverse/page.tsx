"use client";

import useIsArtistOnly from "@/hooks/use-is-artist-only";
import useLoginRequired from "@/hooks/use-login-required";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewBookings from "./sections/bookings";
import { ConnectionRequests } from "./sections/connection-requests";
import UpcomingEvents from "./sections/upcoming-events";
import { useFetchPendingBookingsQuery, useFetchUpcomingEventsQuery } from "@/redux/features/bookingApiSlice";
import { Badge } from "@nextui-org/badge";
import { cn } from "@/lib/utils";

//Artist Profile Page

export default function EchoversePage() {
    const { loginChecked } = useLoginRequired("/echoverse");
    const { isArtist, isLoading, isError } = useIsArtistOnly();
    const {data:newBookings = []} = useFetchPendingBookingsQuery()
    const {data:upcomingEvents = []} = useFetchUpcomingEventsQuery()

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
        <EchoverseMenu title="Upcoming Events"  href="/echoverse/upcoming-events" count={upcomingEvents.length}/>
        <EchoverseMenu href="/echoverse/bookings" count={newBookings.length} title={newBookings.length ===1 ? 'New Booking' : "New Bookings"}/>


      </div>
      <div className="p-3 bg-white/10 rounded-lg h-[300px] w-full md:w-2/6">
       <ConnectionRequests  />
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
    count:number,
    title:string,
    href:string
}
const EchoverseMenu = ({ title, count, href }: EchoverseMenuProps) => {
    return (
        <Link href={href}>
            <div className="w-[200px] gap-3 p-4 h-[100px] bg-blue-500 rounded-md flex items-center ">
                {count > 0 && (
                    <div className="text-white text-3xl">{count}</div>
                )}
                <div className="text-white">{title}</div>
            </div>
        </Link>
    );
};
