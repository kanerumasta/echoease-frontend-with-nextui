"use client";

import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { BookInSchema } from "@/schemas/booking-schemas";
import { useCancelBookingMutation } from "@/redux/features/bookingApiSlice";

import { CancellationPolicy } from "./cancellation-policy";

type CancelBookingProps = {
  booking: z.infer<typeof BookInSchema>;
};
export const CancelBooking: React.FC<CancelBookingProps> = ({ booking }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [cancelBooking, { isLoading, isSuccess }] = useCancelBookingMutation();
  const [cancelReason, setCancelReason] = useState("");

  const handleCancel = async () => {
    const payload = {
      bookingId: booking.id,
      reason: cancelReason,
    };

    await cancelBooking(payload)
      .unwrap()
      .then(() => {
        toast.success("Your booking has been cancelled");
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      })
      .catch(() => toast.error("Cancel failed. Please try again later"));
    onClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Booking cancelled!");
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <Button color="warning" radius="sm" onPress={onOpen}>
        Cancel
      </Button>
      <Modal
        classNames={{
          header: "pt-[300px]",
        }}
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Cancel Booking</ModalHeader>
          <ModalBody>
            <div>
              <CancellationPolicy />
              <p className="mb-5">
                Do you want to cancel your booking for{" "}
                {booking.artist.user.fullname} ?
              </p>
              {/* Add cancellation policy here */}
              <Textarea
                label="Reason of Cancellation"
                placeholder="Please let your echoee know the reason of cancellation."
                radius="sm"
                variant="bordered"
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="warning"
              isLoading={isLoading}
              radius="sm"
              onPress={handleCancel}
            >
              Proceed Cancel
            </Button>
            <Button radius="sm" onPress={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
