import { DatePicker } from "@/components/echo-date-picker";
import { TimeSlotPicker } from "@/components/time-slot-picker";
import { useFetchAllTimeSlotsQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema, TimeslotSchema } from "@/schemas/artist-schemas";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function DateTimePicking({artist}:{artist:z.infer<typeof ArtistInSchema>}){
    const [selectedDate, setSelectedDate] = useState<Date|null>(null)
    const [selectedSlot, setSelectedSlot] = useState<z.infer<typeof TimeslotSchema>|null>(null)

    useEffect(()=>{
        console.log('SLOT', selectedSlot)
    },[selectedSlot])


    useEffect(()=>{
        setSelectedSlot(null)
    },[selectedDate])

    return <div className="">
            <DatePicker unavailableDates={[new Date(2024, 10, 9), new Date(2024, 10, 7)]} dateSelected={selectedDate} setDateSelected={setSelectedDate}/>
            {
                selectedDate && <TimeSlotPicker selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} date={selectedDate} artist={artist}/>
            }
        </div>
}
