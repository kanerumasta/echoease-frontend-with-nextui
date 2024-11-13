"use client";

import { Spacer } from "@nextui-org/spacer";
import { notFound, useParams } from "next/navigation";
import { Fragment, useEffect } from "react";

import BookingProgress from "@/components/booking-status-progress";
import { UserRoles } from "@/config/constants";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useFetchBookingDetailQuery } from "@/redux/features/bookingApiSlice";
import { useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";

import ArtistDetails from "./components/artist-details";
import BasicBookingInfo from "./components/basic-details";
import { CancelBooking } from "./components/cancel-booking";
import { CreateDispute } from "./components/create-dispute";
import DownpaymentInfo from "./components/downpayment-info";
import { Heading } from "./components/heading";
import PaymentInfo from "./components/payment-info";
import { PostReview } from "./components/post-review";
import { Disputes } from "./components/disputes";

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const { refetch: refetchNewNotif } = useFetchNewNotificationsQuery();

  const bookingId = params.id;
  const { data: curUser } = useFetchCurrentUserQuery();

  const { data: bookingDetail, refetch:refetchBooking } = useFetchBookingDetailQuery(bookingId, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetchNewNotif();
  }, []);

  if (curUser && curUser.role === UserRoles.artist) {
    return notFound();
  }

  return (
    <div>
      {bookingDetail && (
        <Fragment>
          <Heading booking={bookingDetail} />
          <Spacer y={4} />
          <div className="w-full flex justify-center">
            <BookingProgress status={bookingDetail.status} />
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <div className="flex gap-2">
                <BasicBookingInfo booking={bookingDetail} />
                <ArtistDetails booking={bookingDetail} />
              </div>
              {/* <ClientDetails booking={bookingDetail}/> */}
            </div>
            {bookingDetail.status === "awaiting_downpayment" && (
              <DownpaymentInfo booking={bookingDetail} />
            )}
            {bookingDetail.status === "completed" ||
              (bookingDetail.status === "approved" && (
                <PaymentInfo booking={bookingDetail} />
              ))}
          </div>

          <Spacer y={4} />
          <div className="flex gap-3">
            {bookingDetail.is_event_due && curUser && (
              <CreateDispute booking={bookingDetail} clientId={curUser.id} />
            )}
            {bookingDetail.is_completed &&
              !bookingDetail.is_reviewed &&
              curUser && <PostReview bookingId={bookingDetail.id} />}
            {!bookingDetail.is_completed && !(bookingDetail.status === 'rejected') &&
              !(bookingDetail.status === "cancelled") && !bookingDetail.is_event_due && (
                <CancelBooking booking={bookingDetail} />
              )}
            {/* <DownloadBookingPDF bookingId={bookingDetail.id}/> */}
          </div>
          <Spacer y={4} />

          {bookingDetail.status === "rejected" &&
            bookingDetail.decline_reason && (
              <div className="p-3 space-y-2 rounded-md bg-white/5">
                <h3 className="text-lg text-white/50">Reason of Decline</h3>
                <p className="text-md">{bookingDetail.decline_reason}</p>
              </div>
            )}
          {bookingDetail.status === "cancelled" &&
            bookingDetail.cancel_reason && (
              <div className="p-3 space-y-2 rounded-md bg-white/5">
                <h3 className="text-lg text-white/50">
                  Reason of Cancellation
                </h3>
                <p className="text-md">{bookingDetail.cancel_reason}</p>
              </div>
            )}
            {bookingDetail.disputes.length > 0 &&
                <Disputes onRefetch={refetchBooking} disputes={bookingDetail.disputes}/>
            }

        </Fragment>
      )}
    </div>
  );
}
