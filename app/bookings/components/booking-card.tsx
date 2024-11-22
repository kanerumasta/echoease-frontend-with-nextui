"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { z } from "zod";
import { useRouter } from "next/navigation";

import CustomImage from "@/components/image";
import { BookInSchema } from "@/schemas/booking-schemas";

type Props = {
  booking: z.infer<typeof BookInSchema>;
  children: React.ReactNode;
  modalClassname?: string;
  modalHeader?: string;
};

export const BookingCard = ({
  booking,
  children,
  modalClassname,
  modalHeader,
}: Props) => {
  const { onOpen, onClose, onOpenChange, isOpen } = useDisclosure();
  const router = useRouter();

  return (
    <div
      className=" rounded-lg p-2 flex gap-2 hover:bg-white/5 hover:z-30 transition-all duration-100 ease-in-out hover:cursor-pointer"
      onClick={() => router.push(`/bookings/${booking.id}`)}
    >
      <div className="min-w-[160px] rounded-lg ">
        <CustomImage
          height="160px"
          src={`${process.env.NEXT_PUBLIC_HOST}${booking.artist.user.profile?.profile_image}`}
          width="160px"
        />
      </div>
      <div className="space-y-2 relative w-full">
        <div className=" flex w-full">
          <h1 className="text-2xl text-white w-full font-bold capitalize">
            {booking.artist.user.fullname}
          </h1>
        </div>
        <div className="h-2/4 pb-3 text-white/40 gap-2r">
          <p className="text-sm capitalize">{booking.event_name}</p>
          <p className="text-xs capitalize">{booking.formatted_event_date}</p>
          <p className="text-xs capitalize">{booking.location}</p>
        </div>
      </div>
      <Modal
        classNames={{ base: modalClassname }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
