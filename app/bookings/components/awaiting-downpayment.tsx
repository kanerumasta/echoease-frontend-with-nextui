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
import { z } from "zod";

import CustomImage from "@/components/image";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useFetchAwaitingDownpaymentBookingsQuery } from "@/redux/features/bookingApiSlice";
import {
  useAttachDownPaymentIntentMutation,
  useCreateDownPaymentIntentMutation,
} from "@/redux/features/paymentApiSlice";
import { BookInSchema } from "@/schemas/booking-schemas";

export const AwaitingDownpayments = () => {
  const { data: awaitingBookings = [] } =
    useFetchAwaitingDownpaymentBookingsQuery();
  const { data: currentUser } = useFetchCurrentUserQuery();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createDownPaymentIntent, { data }] =
    useCreateDownPaymentIntentMutation();
  const [attachDownPaymentIntent] = useAttachDownPaymentIntentMutation();

  const [clickedBooking, setClickedBooking] = useState<z.infer<
    typeof BookInSchema
  > | null>(null);
  const router = useRouter();
  const handlePayNowClick = async (booking: z.infer<typeof BookInSchema>) => {
    const payload = {
      booking: booking.id,
    };

    setClickedBooking(booking);
    await createDownPaymentIntent(payload);
    onOpen();
  };

  const handlePayWithMethod = async (
    booking: z.infer<typeof BookInSchema>,
    method: "gcash" | "paymaya",
  ) => {
    const payload = {
      payment_intent_id: data?.payment_intent_id,
      payment_method: method,
      booking: booking.id,
      return_url: `${process.env.NEXT_PUBLIC_SITE}/pay/validate/down-payment`,
      email: currentUser?.email,
      name: currentUser?.fullname,
    };

    const response = await attachDownPaymentIntent(payload);

    window.location.href = response.data.url;
  };

  return (
    <>
      <div className="w-full p-4 mb-2 rounded-lg">
        <h1 className="text-center text-lg text-white/40 mb-4">
          Awaiting Down payments
        </h1>
        <Table
          classNames={{ wrapper: "bg-transparent" }}
          selectionMode="single"
          onRowAction={(e) => router.push(`/bookings/${e}`)}
        >
          <TableHeader>
            <TableColumn>Event</TableColumn>
            <TableColumn>Event Date</TableColumn>
            <TableColumn>Event Location</TableColumn>
            <TableColumn>Event Time</TableColumn>

            <TableColumn>Echoee</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"Empty awaiting payments"}
            items={awaitingBookings}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.event_name}</TableCell>
                <TableCell>{item.formatted_event_date}</TableCell>
                <TableCell className="text-wrap max-w-[200px]">
                  <span className="capitalize text-xs text-white/50 ">
                    {item.location}
                  </span>
                </TableCell>
                <TableCell>
                  {item.formatted_start_time} - {item.formatted_end_time}
                </TableCell>

                <TableCell>
                  <User
                    avatarProps={{
                      src: `${process.env.NEXT_PUBLIC_HOST}${item.artist.user.profile?.profile_image}`,
                    }}
                    classNames={{ name: "capitalize" }}
                    name={item.client.fullname}
                  />
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        <HiDotsVertical />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem onClick={() => handlePayNowClick(item)}>
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
};
