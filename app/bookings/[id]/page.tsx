"use client";

import CustomError from "@/components/custom-error";
import DisputeIcon from "@/components/icons/dispute";
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
import { Spinner } from "@nextui-org/spinner";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { DisputeReasonOptions } from "./utils";
import { useCreateClientDispute } from "@/hooks/disputes";
import { toast } from "react-toastify";
import useCreateOrder from "@/hooks/payment/use-create-order";
import { useCreatePaymongoPaymentLinkMutation } from "@/redux/features/paymentApiSlice";

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [createPaymongoLink, { isLoading, isError, data }] =
    useCreatePaymongoPaymentLinkMutation();
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

  if (isBookingError) {
    return (
      <CustomError
        message="Error fetching your booking!"
        onRetry={() => alert("retry")}
      />
    );
  }
  const handlePayButtonPress = () => {
    const formData = new FormData();
    bookingDetail && formData.append("booking_id", bookingDetail.id.toString());
    formData.append("amount", "200");
    bookingDetail &&
      formData.append(
        "cancel_url",
        `localhost:3000/bookings/${bookingDetail.id}`
      );

    const payload = {
      amount: "200",
    };

    createPaymongoLink(payload);
  };
  useEffect(() => {
    if (data) {
      window.location.href = data.checkout_link;
    }
  }, [data]);

  const handleSubmitButtonPress = () => {
    if (disputeFormRef.current) {
      disputeFormRef.current.requestSubmit();
    }
  };

  return (
    <div>
      {bookingDetail && (
        <Fragment>
          <p>{bookingDetail.event_name}</p>
          <p>{bookingDetail.event_location}</p>
          <p>{bookingDetail.formatted_event_date}</p>
          <p>{bookingDetail.formatted_event_time}</p>
          {bookingDetail.status === "approved" && (
            <div>
              {!bookingDetail.is_completed && (
                <Button
                  onClick={handlePayButtonPress}
                  color="primary"
                  size="lg"
                  radius="sm"
                >
                  Pay Now
                </Button>
              )}
              <Button
                radius="sm"
                variant="faded"
                color="danger"
                size="lg"
                endContent={<DisputeIcon />}
                onPress={onOpen}
              >
                Create a Dispute
              </Button>
            </div>
          )}
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
