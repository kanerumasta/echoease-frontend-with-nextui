"use client";

import { Section } from "@/components/section";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { UserSchema } from "@/schemas/user-schemas";
import Link from "next/link";
import { formatTimeTo12Hour } from "@/utils/format-time";

export const FinalBookingStep = ({artist,currentUser}:{artist:z.infer<typeof ArtistInSchema>,currentUser:z.infer<typeof UserSchema>}) => {

  const form = useFormContext<z.infer<typeof BookingSchema>>();
  const getLocation = () => {
    const watch = form.watch
    return `${watch('street')}, ${watch('barangay')}, ${watch('municipality')}, Cebu @${watch('landmark')}`
  }

  return (
    <div className="capitalize">

      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>


      {/* Event Details */}
      <Section title="1. Event Details">
        <p><strong>Event Name:</strong>{form.watch('eventName')}</p>
        <p><strong>Date:</strong>{form.watch('eventDate').toDateString()}</p>
        <p><strong>Time:</strong>{`${formatTimeTo12Hour(form.watch('startTime'))} - ${formatTimeTo12Hour(form.watch('endTime'))}`}</p>
        <p><strong>Location:</strong>{getLocation()}</p>

      </Section>

      {/* Artist Information */}
      <Section title="2. Artist Information">
        <p><strong>Artist Name:</strong>{artist.user.first_name}</p>
        <p><strong>Contact:</strong>{artist.user.profile?.phone}</p>

      </Section>

      <Section title="3. Client Information">
        <p><strong>Client Name:</strong>{currentUser.fullname}</p>
        <p><strong>Contact:</strong>{currentUser.profile?.phone}</p>
      </Section>

      {/* Rates & Payment Information */}
      <Section title="4. Rates & Payment">

        <p><strong>Rate Description:</strong>{form.watch('rateName')}</p>
        <p><strong>Rate Amount:</strong>{form.watch('rateAmount')}</p>

      </Section>

      {/* Cancellation Policy */}
      <Section title="5. Cancellation Policy">
  <Link href="/policies/booking-policy" legacyBehavior>
    <a target="_blank" rel="noopener noreferrer">View cancellation policy here</a>
  </Link>
</Section>


    </div>
  );
};
