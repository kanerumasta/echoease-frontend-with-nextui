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
import { Fragment, useRef } from "react";
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

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const {
    form,
    onSubmit,
    isLoading: submitDisputeLoading,
    isError: submitDisputeError,
    isSuccess: submitDisputeSuccess,
  } = useCreateClientDispute();
  const disputeFormRef = useRef<HTMLFormElement | null>(null);
  const bookingId = params.id;
  const {
    data: curUser,
    isLoading: isCurUserLoading,

    isError: isCurUserError,
  } = useFetchCurrentUserQuery();

  const {
    data: bookingDetail,
    isLoading: isBookingLoading,
    isError: isBookingError,
  } = useFetchBookingDetailQuery(bookingId);


    if (curUser && curUser.role === UserRoles.artist) {
        return notFound()
    }


  const handleSubmitButtonPress = () => {
    if (disputeFormRef.current) {
      disputeFormRef.current.requestSubmit();
    }
  };
  if(isBookingError){
    return notFound()
  }

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
                {/* <BookingSummary booking={bookingDetail}/> */}
            </div>
            {/* {bookingDetail.status === "approved" && (
            <div>
              {!bookingDetail.is_completed && (
                <Button
                //   onClick={handlePayButtonPress}
                  color="primary"
                  size="lg"
                  radius="sm"
                >
                  Pay Now
                </Button>
              )}

            </div>
          )} */}

          {bookingDetail.is_completed &&  <Button
                radius="sm"
                variant="faded"
                color="danger"
                size="lg"
                startContent={<DisputeIcon />}
                onPress={onOpen}
              >
                Report a Dispute
              </Button>}
          {bookingDetail.status === "pending" &&
            bookingDetail.artist.user.id === curUser?.id && (
              <Button color="secondary">Confirm</Button>
            )}
        </Fragment>
      )}
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <div className="space-y-2">
              <h1>Report a dispute for your booking</h1>
              <p className="text-xs font-normal dark:text-white/30">
                Please provide the details of the issue related to your booking.
                Our team will review your dispute and get back to you shortly.
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              ref={disputeFormRef}
              className="space-y-2"
            >
              <input
                {...form.register("client")}
                value={curUser?.id}
                style={{ display: "none" }}
              />
              <Input
                {...form.register("booking")}
                variant="faded"
                isInvalid={!!form.formState.errors.booking}
                errorMessage={form.formState.errors.booking?.message}
                size="lg"
                radius="sm"
                label="Booking Reference No."
                value={bookingDetail?.id.toString()}
                isReadOnly
              />
              <Select
                variant="faded"
                isInvalid={!!form.formState.errors.reason}
                errorMessage={form.formState.errors.reason?.message}
                onChange={(e) => form.setValue("reason", e.target.value)}
                size="lg"
                radius="sm"
                label="Dispute Reason"
              >
                {DisputeReasonOptions.map((r) => (
                  <SelectItem key={r.id}>{r.label}</SelectItem>
                ))}
              </Select>

              <Textarea
                {...form.register("description")}
                variant="faded"
                isInvalid={!!form.formState.errors.description}
                errorMessage={form.formState.errors.description?.message}
                radius="sm"
                label="Description"
                placeholder="Please type here the dispute description..."
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button size="lg" radius="sm" onPress={onClose}>
              Cancel
            </Button>
            <Button
              onPress={handleSubmitButtonPress}
              color="danger"
              variant="faded"
              radius="sm"
              size="lg"
              isLoading={submitDisputeLoading}
              isDisabled={submitDisputeLoading}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
