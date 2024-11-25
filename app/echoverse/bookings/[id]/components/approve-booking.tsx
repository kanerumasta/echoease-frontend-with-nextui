"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { toast } from "react-toastify";

import { useConfirmBookingMutation } from "@/redux/features/bookingApiSlice";

type ApproveBookingProps = {
  bookingId: number;
};
export const ApproveBooking: React.FC<ApproveBookingProps> = ({
  bookingId,
}) => {
  const [confirmBooking, { isLoading }] = useConfirmBookingMutation();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const handleConfirm = async () => {
    await confirmBooking(bookingId.toString()).unwrap();
    toast.success("Booking has been confirmed.");
    onClose();
  };

  return (
    <>
      <Button
        color="primary"
        isLoading={isLoading}
        radius="sm"
        onPress={onOpen}
      >
        Confirm Booking
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <p>Confirm Your Booking</p>
          </ModalHeader>
          <ModalBody>
            <div>
              <p className="text-white/50 text-sm">
                By confirming this booking, the client will be notified to
                submit a downpayment. Once the payment is completed, the booking
                will be officially confirmed and added to your upcoming events
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleConfirm}>
              Confirm
            </Button>
            <Button onPress={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
