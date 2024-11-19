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
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { Image } from "@nextui-org/image";
import { useFetchArtistRatingQuery } from "@/redux/features/reviewsApiSlice";
import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";

export default function EchoversePage() {
  const { loginChecked } = useLoginRequired("/echoverse");
  const {data:currentArtist} = useFetchDetailCurrentArtistQuery()
  const { isArtist, isLoading, isError } = useIsArtistOnly();
  const { data: newBookings = [] } = useFetchPendingBookingsQuery();
  const { data: upcomingEvents = [] } = useFetchUpcomingEventsQuery();
  const {data:ratingData} = useFetchArtistRatingQuery(currentArtist && currentArtist.id? currentArtist.id : skipToken);


  //login and isartist checking
  if (!loginChecked || isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !isArtist) {
    return notFound();
  }

  return (
    <div className="space-y-2 bg-girl-music bg-cover background bg-center  bg-no-repeat">
        <div className="backdrop-blur-lg bg-black/70 space-y-2">
      <div className="md:flex md:gap-2 space-y-2 md:space-y-0">
        <div className=" flex bg-white/5 p-3 flex-wrap gap-4 rounded-lg min-h-[300px] w-full ">
          <EchoverseMenu
            icon = {<Image alt="Icon Event" width={80} src={"/media/event-list.png"}/>}
            color="bg-gradient-to-r from-blue-500/30 to-purple-700/30"
            count={upcomingEvents.length}
            href="/echoverse/upcoming-events"
            title="Upcoming Events"
          />
          <EchoverseMenu
            icon = {<Image alt="Icon Event" width={65} src={"/media/booking.png"}/>}
            color="bg-gradient-to-r from-purple-700/30 to-purple-500/30"
            count={newBookings.length}
            href="/echoverse/bookings"
            title={newBookings.length === 1 ? "New Booking" : "New Bookings"}
          />
          {ratingData && ratingData.rating__avg &&
            <EchoverseMenu
                icon = {<Image alt="Icon Event" width={60} src={"/media/rating.png"}/>}
                color="bg-gradient-to-r from-purple-700/30 to-purple-500/30"
                count={parseFloat(ratingData.rating__avg.toFixed(1))}
                href="/echoverse/bookings"
                title={"Ratings"}
            />
        }
        </div>
        <div className="p-3 bg-white/10 rounded-lg h-[300px] w-full md:w-2/6">
          <ConnectionRequests />
        </div>
      </div>
      <div className="md:flex md:gap-2 space-y-2 md:space-y-0 ">
        <div className="w-full md:w-2/4 bg-white/10 rounded-lg min-h-[200px] p-3">
          <p className="mb-3 text-white/50">Booking Inquiries</p>
          <NewBookings />
        </div>
        <div className="w-full md:w-2/4 bg-white/10 rounded-lg min-h-[200px] p-3">
          <p className="mb-3 text-white/50">Upcoming Events</p>
          <UpcomingEvents />
        </div>
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
  icon:any
};
const EchoverseMenu = ({ title, count, href, color, icon }: EchoverseMenuProps) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          `w-[210px] bg-white/10 shadow-md shadow-black gap-3 p-4 h-[120px] rounded-xl flex items-center`,
            color
        )}
      >
        {icon}
        <div className="text-white text-xl">{title}</div>
        {count > 0 && (
          <div className="text-white text-5xl w-14 flex items-center justify-center h-14 bg-white/5">
            {count}
          </div>
        )}
      </div>
    </Link>
  );
};
