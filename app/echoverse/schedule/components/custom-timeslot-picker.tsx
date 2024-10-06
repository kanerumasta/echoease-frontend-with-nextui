import { cn } from "@/lib/utils"
import { useFetchAllTimeSlotsQuery, useFetchTimeSlotsQuery } from "@/redux/features/artistApiSlice"
import { ArtistInSchema, TimeslotSchema } from "@/schemas/artist-schemas"
import { Button } from "@nextui-org/button"
import { TimeInput } from "@nextui-org/date-input"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Skeleton } from "@nextui-org/skeleton"
import { Dispatch, SetStateAction, useEffect, useMemo } from "react"
import { z } from "zod"
import { SpecialTimeSlotForm } from "../forms/special-timeslot-form"

type TimeSlotProps = {
    selectedSlot:z.infer<typeof TimeslotSchema> | null,
    setSelectedSlot:Dispatch<SetStateAction<z.infer<typeof TimeslotSchema>|null>>,
    artist:z.infer<typeof ArtistInSchema>,
    date:Date,

    createSlotExceptionHandler: () => void
}

export const EchoverseTimeSlotPicker = ({selectedSlot, setSelectedSlot, artist, date, createSlotExceptionHandler, }: TimeSlotProps) => {
    const {isOpen,onClose,onOpen,onOpenChange} = useDisclosure()

    const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const artistId = artist.id.toString()

    const {data: availableTimeSlots, isLoading: availableTimeSlotsLoading, isError: availableTimeSlotsError, refetch} = useFetchTimeSlotsQuery({ artistId, date: dateString }, {
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        setSelectedSlot(null)
    }, [date])

    if (availableTimeSlotsLoading) {
        return (
            <div>
                <h1>Loading Timeslots...</h1>
                <div className="space-y-2">
                    <Skeleton className="h-20 w-full rounded-lg"/>
                    <Skeleton className="h-20 w-full rounded-lg"/>
                    <Skeleton className="h-20 w-full rounded-lg"/>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            
            {availableTimeSlots?.map((slot) => (
                <div
                    onClick={() =>setSelectedSlot(slot)}
                    key={slot.id}
                    className={cn("p-4 rounded-lg bg-blue-500/35 my-1 cursor-pointer text-xl space-y-2", {
                        "bg-blue-500": selectedSlot?.id === slot.id,
                    })}
                >
                    <p>{slot.start_time} - {slot.end_time}</p>
                    {selectedSlot?.id === slot.id && (
                        <div>
                            <Button onClick={()=>{setSelectedSlot(null);createSlotExceptionHandler();}}>Set Unavailable</Button>
                        </div>
                    )}
                </div>
            ))}

            <SpecialTimeSlotForm artist={artist} date={date}/>
        </div>
    )
}
