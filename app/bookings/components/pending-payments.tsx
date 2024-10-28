"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

import {
  useAttachFinalPaymentMutation,
  useCreateFinalPaymentIntentMutation,
} from "@/redux/features/paymentApiSlice";
import { useFetchPendingPaymentsQuery } from "@/redux/features/bookingApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import CustomImage from "@/components/image";

export default function PendingPayments() {
  const { data: pendingPayments = [], isLoading } =
    useFetchPendingPaymentsQuery();
  const [clickedBooking, setClickedBooking] = useState<number | null>(null);
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [createFinalPaymentIntent, { data: intentData }] =
    useCreateFinalPaymentIntentMutation();
  const [attachFinalPayment] = useAttachFinalPaymentMutation();
  const { data: currentUser } = useFetchCurrentUserQuery();
  const router = useRouter();

  const handlePayNowClick = async (bookingId: number) => {
    setClickedBooking(bookingId);
    const payload = {
      booking: bookingId,
    };

    await createFinalPaymentIntent(payload);
    onOpen();
  };

  const handlePayWithMethod = async (
    bookingId: number,
    method: "gcash" | "paymaya",
  ) => {
    if (intentData) {
      const payload = {
        payment_intent_id: intentData?.payment_intent_id,
        payment_method: method,
        booking: bookingId,
        return_url: `${process.env.NEXT_PUBLIC_SITE}/pay/validate/final-payment`,
        email: currentUser?.email,
        name: currentUser?.fullname,
      };

      console.log(payload);

      const response = await attachFinalPayment(payload);

      window.location.href = response.data.url;
    }
  };

  return (
    <>
      <div className="p-4 rounded-lg">
        <h1 className="text-center mb-4 text-lg text-white/40">
          Pending Payments
        </h1>
        <Table
          classNames={{ wrapper: "bg-trasparent" }}
          onRowAction={(e) => router.push(`/bookings/${e}`)}
        >
          <TableHeader>
            <TableColumn>Event</TableColumn>
            <TableColumn>Event Date</TableColumn>
            <TableColumn>Event Location</TableColumn>
            <TableColumn>Artist</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"No pending payments yet."}
            isLoading={isLoading}
            items={pendingPayments}
          >
            {(booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.event_name}</TableCell>
                <TableCell>{booking.formatted_event_date}</TableCell>
                <TableCell>{booking.location}</TableCell>
                <TableCell>
                  <User
                    avatarProps={{
                      src: `${process.env.NEXT_PUBLIC_HOST}${booking.artist.user.profile?.profile_image}`,
                    }}
                    classNames={{
                      name: "capitalize",
                      description: "capitalize",
                    }}
                    description={booking.artist.user.role}
                    name={booking.artist.user.fullname}
                  />
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="lg" variant="light">
                        {" "}
                        <HiDotsVertical />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => handlePayNowClick(booking.id)}
                      >
                        Pay Now
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Modal
        classNames={{
          base: "bg-white text-black",
          header: "bg-blue-500 text-white",
          closeButton: "text-white hover:bg-white/30",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Pay Downpayment</ModalHeader>
          <ModalBody>
            {clickedBooking && (
              <div>
                <h1 className="text-center font-bold text-lg">Pay with</h1>
                <div className="fles items-center justify-center">
                  <div className="flex justify-center gap-4 p-3">
                    <div
                      className="border-3 hover:cursor-pointer hover:bg-blue-500/20 border-blue-500/50 p-3 rounded-xl"
                      onClick={() =>
                        handlePayWithMethod(clickedBooking, "gcash")
                      }
                    >
                      <CustomImage
                        height="60px"
                        src="/media/GCash-Logo.png"
                        width="100px"
                      />
                    </div>
                    <div
                      className="border-3 hover:cursor-pointer hover:bg-green-500/20 border-green-500/50 p-3 rounded-xl"
                      onClick={() =>
                        handlePayWithMethod(clickedBooking, "paymaya")
                      }
                    >
                      <CustomImage
                        height="60px"
                        src="/media/paymaya.png"
                        width="100px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
