
'use client'

import CustomImage from "@/components/image"
import { cn } from "@/lib/utils"
import { BookInSchema } from "@/schemas/booking-schemas"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { z } from "zod"

type Props = {
    booking:z.infer<typeof BookInSchema>
}

const Description = ({title, value, isHero}:{title:string, value:string, isHero?:boolean}) => {
    return <div className="flex items-center capitalize whitespace-nowrap">
        <p className="text-xs text-white/50 mr-2">{title}:</p>
        <p className={cn("text-xs text-white/70", {"text-white text-md":isHero})}>{value}</p>
    </div>
}

export const BookingCard = ({booking}:Props) => {
    const {onOpen,onClose,onOpenChange,isOpen} = useDisclosure()
    return <div onClick={onOpen} className="bg-white/15 rounded-lg p-2 flex gap-2 hover:bg-white/20 hover:cursor-pointer">
        <CustomImage width="160px" height="160px" src={`${process.env.NEXT_PUBLIC_HOST}${booking.artist.user.profile?.profile_image}`}/>
        <div className="space-y-2">
            <Description isHero title="Echoee" value={booking.artist.user.fullname}/>
            <Description title="Reference" value={booking.id.toString()}/>
            <Description title="Event" value={booking.event_name}/>
            <Description title="Event Date" value={booking.formatted_event_date}/>
            <Description title="Rate Description" value={booking.rate.name}/>
            <Description title="Amount" value={booking.rate.amount.toString()}/>
        </div>
        <Modal isDismissable onOpenChange={onOpenChange} isOpen={isOpen}>
            <ModalContent>
                <ModalHeader>Moidfoisdhnbf</ModalHeader>
                <ModalBody>
                    <div>
                        {booking.artist.user.fullname}
                        {booking.event_name}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>


    </div>
}
