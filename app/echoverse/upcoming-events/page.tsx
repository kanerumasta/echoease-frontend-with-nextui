"use client";

import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";
import { z } from "zod";

import { BookInSchema } from "@/schemas/booking-schemas";
import { useFetchUpcomingEventsQuery } from "@/redux/features/bookingApiSlice";

export default function UpcomingEventsPage() {
  const { data: approvedBookings, isLoading } = useFetchUpcomingEventsQuery();

  return (
    <div className="w-full h-full flex flex-wrap gap-3">
      {approvedBookings && approvedBookings?.length <= 0 && (
        <div className="bg-white/5 w-full h-full flex items-center justify-center">
          <p className="text-xl text-white/50">No upcoming events</p>
        </div>
      )}
      {approvedBookings?.map((booking) => <EventCard booking={booking} />)}
    </div>
  );
}

const EventCard = ({ booking }: { booking: z.infer<typeof BookInSchema> }) => {
  const imageUrl = booking.client.business_image
    ? booking.client.business_image
    : booking.client.profile?.profile_image;

  return (
    <div className="min-w-[250px] border-[1px] border-white/10 p-3 rounded-lg max-w-[250px]  bg-white/5 ">
      <Image
        isBlurred
        isZoomed
        src={`${process.env.NEXT_PUBLIC_HOST}${imageUrl}`}
        width={250}
      />
      <Spacer y={4} />
      <h1 className="text-2xl font-bold capitalize">{booking.event_name}</h1>
      <div className="text-white/50 text-xs capitalize">
        <p className="text-sm capitalize">{booking.client.fullname}</p>
        <p>{booking.location}</p>
        <p>{booking.formatted_event_date}</p>
        <p>
          {booking.formatted_start_time} - {booking.formatted_end_time}
        </p>
      </div>
    </div>
  );
};
