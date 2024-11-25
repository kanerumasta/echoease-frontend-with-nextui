import { z } from "zod";

import { BookInSchema } from "@/schemas/booking-schemas";

import { BookingCard } from "./booking-card";

type Props = {
  bookings: z.infer<typeof BookInSchema>[];
};

export default function UpcomingBookings({ bookings }: Props) {
  return (
    <div className="flex flex-col w-full max-h-[75vh] overflow-y-scroll gap-2 scrollbar-hide">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
