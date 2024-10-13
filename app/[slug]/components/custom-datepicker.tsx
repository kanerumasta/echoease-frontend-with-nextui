'use client'

import { DatePicker } from "@/components/echo-date-picker"
import { cn } from "@/lib/utils"
import { BookingSchema } from "@/schemas/booking-schemas"
import { UnavailableDateSchema } from "@/schemas/schedule-schemas"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/chip"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Dispatch, SetStateAction } from "react"
import { useFormContext } from "react-hook-form"
import { IoCalendar } from "react-icons/io5"
import { z } from "zod"
import { useBookingContext } from "../forms/booking-provider"
import { useFetchArtistWeekdaysAvailabilityQuery } from "@/redux/features/scheduleApiSlice"

type Props = {
    selectedDate:Date,
    setSelectedDate:Dispatch<SetStateAction<Date>>,
    unavailableDates: z.infer<typeof UnavailableDateSchema>[]
}

export const CustomDatePicker = ({selectedDate, setSelectedDate, unavailableDates}:Props) => {
    const {artist} = useBookingContext()
    const {data:weekdaysAvailability} = useFetchArtistWeekdaysAvailabilityQuery(artist.id)
    const form = useFormContext<z.infer<typeof BookingSchema>>()

    const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure()
    return   <div className={cn("p-3 w-full flex gap-2 items-center justify-between border-2 border-white/20 rounded-lg",{"border-3 border-red-500":!!form.formState.errors.eventDate})}>

            <Chip size="lg" variant="bordered" className="text-white" color="secondary">{selectedDate.toDateString()}</Chip>
        <Button startContent={<IoCalendar />} radius="sm" onPress={onOpen}>Pick the event date</Button>

        <Modal classNames={{base:'max-w-[500px] max-w-[500px]'}} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Pick a date</ModalHeader>
                <ModalBody>
                  <DatePicker artistId={artist.id} unavailableDates={unavailableDates} onDatePick={onClose} dateSelected={selectedDate} setDateSelected={setSelectedDate}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
}
