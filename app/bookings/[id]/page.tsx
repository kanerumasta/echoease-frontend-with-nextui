"use client";

import DisputeIcon from "@/components/icons/dispute";
import { UserRoles } from "@/config/constants";
import { useCreateClientDispute } from "@/hooks/disputes";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useFetchBookingDetailQuery } from "@/redux/features/bookingApiSlice";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { notFound, useParams } from "next/navigation";
import { Dispatch, Fragment, SetStateAction, useEffect, useRef } from "react";
import { DisputeReasonOptions } from "./utils";
import CustomImage from "@/components/image";
import { BookingEchoee } from "./components/booking-echoee";
import { Heading } from "./components/heading";
import { BookingDetail } from "./components/booking-detail";
import { Spacer } from "@nextui-org/spacer";
import { BookingSummary } from "./components/booking-summary";
import BookingProgress from "@/components/booking-status-progress";
import PaymentInfo from "./components/payment-info";
import BasicBookingInfo from "./components/basic-details";
import ArtistDetails from "./components/artist-details";
import ClientDetails from "./components/client-details";
import DownpaymentInfo from "./components/downpayment-info";
import { MdUpload } from "react-icons/md";
import { CreateDispute } from "./components/create-dispute";
import { PostReview } from "./components/post-review";
import { CancelBooking } from "./components/cancel-booking";
import { useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();

  const {refetch:refetchNewNotif} = useFetchNewNotificationsQuery()

  const bookingId = params.id;
  const {
    data: curUser,
  } = useFetchCurrentUserQuery();

  const {
    data: bookingDetail,
  } = useFetchBookingDetailQuery(bookingId,{refetchOnMountOrArgChange:true});

    if (curUser && curUser.role === UserRoles.artist) {
        return notFound()
    }

    useEffect(()=>{
        refetchNewNotif()
    },[])


  return (
    <div>
      {bookingDetail && (
          <Fragment>
            <Heading booking={bookingDetail}/>
            <Spacer  y={4}/>
            <div className="w-full flex justify-center">
            <BookingProgress status={bookingDetail.status}/>
            </div>
            <div className="flex gap-3">
            <div className="w-full">
                <div className="flex gap-2">
                <BasicBookingInfo booking={bookingDetail}/>
                <ArtistDetails booking={bookingDetail} />
                </div>
                <ClientDetails booking={bookingDetail}/>
            </div>
            {bookingDetail.status === 'awaiting_downpayment' &&
                <DownpaymentInfo booking={bookingDetail}/>
            }
            {bookingDetail.status === 'completed' || bookingDetail.status === 'approved' &&
    <PaymentInfo booking={bookingDetail} />
}
            </div>

        <Spacer y={4}/>
            <div className="flex gap-3">
          {bookingDetail.is_completed && curUser &&  <CreateDispute booking={bookingDetail} clientId={curUser.id}/> }
          {bookingDetail.is_completed && !bookingDetail.is_reviewed && curUser &&  <PostReview bookingId={bookingDetail.id} /> }
          {!bookingDetail.is_completed && !(bookingDetail.status === 'cancelled') && <CancelBooking booking={bookingDetail} /> }
          </div>

          {bookingDetail.status === 'rejected' && bookingDetail.decline_reason &&
           <div className="p-3 space-y-2 rounded-md bg-white/5">
            <h3 className="text-lg text-white/50">Reason of Decline</h3>
            <p className="text-md">{bookingDetail.decline_reason}</p>
            </div>}
          {bookingDetail.status === 'cancelled' && bookingDetail.cancel_reason &&
           <div className="p-3 space-y-2 rounded-md bg-white/5">
            <h3 className="text-lg text-white/50">Reason of Cancellation</h3>
            <p className="text-md">{bookingDetail.cancel_reason}</p>
            </div>}
        </Fragment>
      )}

    </div>
  );
}
