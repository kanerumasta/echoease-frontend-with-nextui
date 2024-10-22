"use client";

import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { UserSchema } from "@/schemas/user-schemas";
import Link from "next/link";
import { formatTimeTo12Hour } from "@/utils/format-time";
import { Divider } from "@nextui-org/divider";

export const FinalBookingStep = ({ artist, currentUser }: { artist: z.infer<typeof ArtistInSchema>, currentUser: z.infer<typeof UserSchema> }) => {
  const form = useFormContext<z.infer<typeof BookingSchema>>();

  const getLocation = () => {
    const watch = form.watch;
    return `${watch('street')}, ${watch('barangay')}, ${watch('municipality')}, Cebu @${watch('landmark')}`;
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-gray-800 text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Booking Summary</h2>

      <div className="mb-6 mt-3">
        <h3 className="text-lg font-semibold mb-2">Event Details</h3>
        <p className="mb-1">Event Name: <span className="font-medium">{form.watch('eventName')}</span></p>
        <p className="mb-1">Date: <span className="font-medium">{form.watch('eventDate').toDateString()}</span></p>
        <p className="mb-1">Time: <span className="font-medium">{`${formatTimeTo12Hour(form.watch('startTime'))} - ${formatTimeTo12Hour(form.watch('endTime'))}`}</span></p>
        <p className="mb-1">Location: <span className="font-medium">{getLocation()}</span></p>
        <p className="mb-1">Venue: <span className="font-medium">{form.watch('venue')}</span></p>
      </div>
      <Divider />

      <div className="mb-6 mt-3">
        <h3 className="text-lg font-semibold mb-2">Artist Information</h3>
        <p className="mb-1">Artist Name: <span className="font-medium">{artist.user.first_name}</span></p>
        <p className="mb-1">Contact: <span className="font-medium">{artist.user.profile?.phone}</span></p>
      </div>
      <Divider />

      <div className="mb-6 mt-3">
        <h3 className="text-lg font-semibold mb-2">Client Information</h3>
        <p className="mb-1">Client Name: <span className="font-medium">{currentUser.fullname}</span></p>
        <p className="mb-1">Contact: <span className="font-medium">{currentUser.profile?.phone}</span></p>
      </div>
      <Divider />

      <div className="mb-6 mt-3">
        <h3 className="text-lg font-semibold mb-2">Rates & Payment</h3>
        <p className="mb-1">Rate Description: <span className="font-medium">{form.watch('rateName')}</span></p>
        <p className="mb-1">Rate Amount: <span className="font-medium">${form.watch('rateAmount')}</span></p>
      </div>
      <Divider />

      <div>
        <h3 className="text-lg font-semibold mb-2">Cancellation Policy</h3>
        <Link href="/policies/booking-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
          View cancellation policy here
        </Link>
      </div>
    </div>
  );
};
