'use client'

import { DatePicker } from "@/components/echo-date-picker"
import { UnavailableDateSchema } from "@/schemas/schedule-schemas"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/chip"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Dispatch, SetStateAction } from "react"
import { IoCalendar } from "react-icons/io5"
import { z } from "zod"

type Props = {
    selectedDate:Date,
    setSelectedDate:Dispatch<SetStateAction<Date>>,
    unavailableDates: z.infer<typeof UnavailableDateSchema>[]
}

export const CustomDatePicker = ({selectedDate, setSelectedDate, unavailableDates}:Props) => {

    const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure()
    return <>

            <Chip size="lg" variant="bordered" className="text-white" color="secondary">{selectedDate.toDateString()}</Chip>
        <Button startContent={<IoCalendar />} radius="sm" onPress={onOpen}>Pick the event date</Button>

        <Modal classNames={{base:'max-w-[700px]'}} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Pick a date</ModalHeader>
                <ModalBody>
                    <DatePicker unavailableDates={unavailableDates} onDatePick={onClose} dateSelected={selectedDate} setDateSelected={setSelectedDate}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}
