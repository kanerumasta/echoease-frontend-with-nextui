"use client";

import { Chip } from "@nextui-org/chip";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoChevronBack, IoCopy } from "react-icons/io5";
import { z } from "zod";
import { Button } from "@nextui-org/button";

import { BookInSchema } from "@/schemas/booking-schemas";

type HeadingProps = {
  booking: z.infer<typeof BookInSchema>;
};

export const Heading: React.FC<HeadingProps> = ({ booking }) => {
  const [copied, setCopied] = useState(false); //Booking reference copied to clipboard
  const handleCopy = () => {
    console.log(
        'cojpsadf'
    )
    try {
      navigator.clipboard.writeText(booking.booking_reference);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      console.log('copied')
    } catch (error) {
        console.log(error)
    }
  };
  const router = useRouter();

  return (
    <div className="h-[100px] flex justify-between items-center px-2 bg-white/5">
      <div
        className="flex items-center gap-2 p-2 text-white/50 hover:text-white hover:cursor-pointer"
        onClick={() => router.back()}
      >
        <IoChevronBack />
        <span>Back</span>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-3xl capitalize font-bold">
          {booking.artist.user.fullname}
        </h1>
        <p className="text-xs text-white/40">
          Booking Date: {booking.created_at}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <p className="text-white/50">Booking: {booking.booking_reference}</p>
          <Button onClick={handleCopy} className="z-50" isIconOnly radius="full" variant="light">
            <IoCopy className="text-white/50 hover:text-white cursor-pointer" />
          </Button>
          {copied && <p>Copied!</p>}
        </div>

        <Chip
          className="capitalize"
          color={
            booking.is_completed
              ? "success"
              : booking.status === "pending"
                ? "warning"
                : booking.status === "awaiting_downpayment"
                  ? "warning"
                  : booking.status === "rejected"
                    ? "danger"
                    : "default"
          }
          variant="flat"
        >
          {booking.status}
        </Chip>
      </div>
    </div>
  );
};
