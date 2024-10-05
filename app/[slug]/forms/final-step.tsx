"use client";

import { Section } from "@/components/section";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const FinalBookingStep = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const form = useFormContext<z.infer<typeof BookingSchema>>();

  return (
    <div className="">

      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

      {/* Booking Reference */}
      <Section title="1. Booking Reference">
        <p><strong>Booking ID:</strong> 34534</p>
      </Section>

      {/* Event Details */}
      <Section title="2. Event Details">
        <p><strong>Event Name:</strong> Birthday</p>
        <p><strong>Date & Time:</strong>January 23,3003, 3:00pm</p>
        <p><strong>Location:</strong> San pascual, Trinidadn, Tubang</p>

      </Section>

      {/* Artist Information */}
      <Section title="3. Artist Information">
        <p><strong>Artist Name:</strong>Kaneru masta</p>
        <p><strong>Contact:</strong>0984854454</p>

      </Section>

      {/* Client Information */}
      <Section title="4. Client Information">
        <p><strong>Client Name:</strong> Butikon</p>
        <p><strong>Contact:</strong>0983457485</p>
      </Section>

      {/* Rates & Payment Information */}
      <Section title="5. Rates & Payment">

        <p><strong>Rate Description:</strong>1 to 3 songs</p>
        <p><strong>Rate Amount:</strong>8000</p>

      </Section>

      {/* Cancellation Policy */}
      <Section title="6. Cancellation Policy">
        <p>View cancellation policy</p>
      </Section>


    </div>
  );
};
