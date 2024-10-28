import { z } from "zod";

import { BookInSchema } from "@/schemas/booking-schemas";

type BookingDetailProps = {
  booking: z.infer<typeof BookInSchema>;
};
export const BookingDetail: React.FC<BookingDetailProps> = ({ booking }) => {
  return (
    <div className="bg-white/5 p-2 w-full rounded-md">
      <h1 className="text-md text-white/50 ">Detail</h1>
      <div className="flex capitalize gap-2 ">
        <p>Event: </p>
        <p>{booking.event_name}</p>
      </div>

      <div className="flex capitalize gap-2 ">
        <p>Event: </p>
        <p>{booking.event_name}</p>
      </div>
      <div className="flex capitalize gap-2 ">
        <p>Event: </p>
        <p>{booking.event_name}</p>
      </div>
    </div>
  );
};
