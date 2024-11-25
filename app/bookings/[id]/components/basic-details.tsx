import React from "react";
import { z } from "zod";

import { BookInSchema } from "@/schemas/booking-schemas"; // inferred from BookInSchema

interface BasicBookingInfoProps {
  booking: z.infer<typeof BookInSchema>;
}

const BasicBookingInfo: React.FC<BasicBookingInfoProps> = ({ booking }) => {
  return (
    <div className="p-4  w-full border-b-[1px] border-white/10">
      <h2 className="text-xl font-bold mb-4">Basic Booking Information</h2>

      <div className="mb-2">
        <p className="text-gray-700">Booking Reference:</p>
        <p className="font-medium">{booking.booking_reference}</p>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">Event Name:</p>
        <p className="font-medium">{booking.event_name}</p>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">Event Date and Time:</p>
        <p className="font-medium">
          {booking.formatted_event_date} ({booking.formatted_start_time} -{" "}
          {booking.formatted_end_time})
        </p>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">Event Location and Venue:</p>
        <p className="font-medium">{booking.location}</p>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">Booking Creation Date:</p>
        <p className="font-medium">
          {new Date(booking.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BasicBookingInfo;
