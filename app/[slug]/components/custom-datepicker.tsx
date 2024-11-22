"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { IoCalendar } from "react-icons/io5";
import { z } from "zod";

import { DatePicker } from "@/components/echo-date-picker";
import { cn } from "@/lib/utils";
import { BookingSchema } from "@/schemas/booking-schemas";
import { UnavailableDateSchema } from "@/schemas/schedule-schemas";

import { useBookingContext } from "../forms/booking-provider";

type Props = {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  unavailableDates: z.infer<typeof UnavailableDateSchema>[];
};

export const CustomDatePicker = ({
  selectedDate,
  setSelectedDate,
  unavailableDates,
}: Props) => {
  const { artist } = useBookingContext();
  const form = useFormContext<z.infer<typeof BookingSchema>>();

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      className={cn(
        "p-3 w-full flex gap-2 items-center justify-between border-2 border-white/20 rounded-lg",
        { "border-3 border-[#f31260]": !!form.formState.errors.eventDate },
      )}
    >
      {selectedDate?.toDateString()}
      <Button
        color="primary"
        radius="sm"
        startContent={<IoCalendar />}
        onPress={onOpen}
      >
        Pick the event date
      </Button>

      <Modal
        classNames={{ base: "max-w-[500px] max-w-[500px]" }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Pick a date</ModalHeader>
          <ModalBody>
            <DatePicker
              artistId={artist.id}
              dateSelected={selectedDate}
              setDateSelected={setSelectedDate}
              unavailableDates={unavailableDates}
              onDatePick={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
