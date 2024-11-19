"use client";

import { useParams } from "next/navigation";
import { Spacer } from "@nextui-org/spacer";
import { useEffect } from "react";

import { useFetchBookingDetailQuery } from "@/redux/features/bookingApiSlice";
import BookingProgress from "@/components/booking-status-progress";
import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice";
import { useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";

import { Heading } from "./components/heading";
import ClientDetails from "./components/client-details";
import BasicBookingInfo from "./components/basic";
import { CreateDispute } from "./components/create-dispute";
import { ApproveBooking } from "./components/approve-booking";
import { DeclineBooking } from "./components/decline-booking";
import { CancelBooking } from "@/app/bookings/[id]/components/cancel-booking";
import { MyMap } from "@/components/map";

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: currentArtist } = useFetchDetailCurrentArtistQuery();
  const { refetch: refetchNotif } = useFetchNewNotificationsQuery();
  const { data: booking } = useFetchBookingDetailQuery(params.id);

  useEffect(() => {
    refetchNotif();
  }, []);

  return (
    <div>
      {/* Header */}
      {booking && (
        <>
          <Heading booking={booking} />
          <BookingProgress status={booking.status} />
          <div className="lg:flex gap-2 mt-2">
            <BasicBookingInfo booking={booking} />
            <ClientDetails booking={booking} />
          </div>
          <Spacer y={4} />
          <div className="flex gap-2 w-full justify-end">

            {currentArtist && booking.is_completed && (
                <>
              <CreateDispute artistId={currentArtist.id} booking={booking} />
              </>
            )}
            {booking.status === "pending" && (
                <DeclineBooking bookingId={booking.id} />
            )}
            {booking.status === "pending" && (
                <ApproveBooking bookingId={booking.id} />
            )}
            {!(booking.is_completed || booking.status === 'cancelled'  || booking.status === 'rejected' || booking.status === 'pending') && (
  <CancelBooking booking={booking} />
)}
          </div>
          <MyMap booking={booking} />
        </>
      )}
    </div>
  );
}
