"use client";

import useIsArtistOnly from "@/hooks/use-is-artist-only";
import useLoginRequired from "@/hooks/use-login-required";
import { useFetchReceivedConnectionRequestsQuery } from "@/redux/features/artistApiSlice";
import { notFound } from "next/navigation";
import NewBookings from "./sections/bookings";
import UpcomingEvents from "./sections/upcoming-events";
import { User } from "@nextui-org/user";
import CustomImage from "@/components/image";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { ConnectionRequests } from "./sections/connection-requests";
import { Spinner } from "@nextui-org/spinner";
import Link from "next/link";

//Artist Profile Page

export default function EchoversePage() {
    const { loginChecked } = useLoginRequired("/echoverse");
    const { isArtist, isLoading, isError } = useIsArtistOnly();

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
        <EchoverseMenu href="/echoverse/about" title={"About"}/>
        <EchoverseMenu href="/echoverse/portfolio" title={"Portfolio"}/>
        <EchoverseMenu href="/echoverse/bookings" title={"Bookings"}/>
        <EchoverseMenu href="/echoverse/about" title={"About"}/>

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
    title:string,
    href:string
}
const EchoverseMenu = ({title, href}:EchoverseMenuProps) => {
    return (
        <Link href={href}>
    <div className="w-[100px] h-[100px] bg-blue-500 rounded-md flex items-center justify-center">
            {title}
    </div>
    </Link>
    )
}
