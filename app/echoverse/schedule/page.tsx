'use client'
import { DatePicker } from "@/components/echo-date-picker";
import { useCreateTimeSlotExceptionMutation, useFetchDetailCurrentArtistQuery, useFetchTimeSlotsQuery } from "@/redux/features/artistApiSlice";
import { TimeslotSchema } from "@/schemas/artist-schemas";
import { useState } from "react";
import { z } from "zod";
import { EchoverseTimeSlotPicker } from "./components/custom-timeslot-picker";

export default function SchedulePage(){
    const [selectedDate, setSelectedDate] = useState<Date|null>(null)
    const {data:currentArtist} = useFetchDetailCurrentArtistQuery()
    const [selectedSlot, setSelectedSlot] = useState<z.infer<typeof TimeslotSchema>|null>(null)
    const [createTimeSlotException] = useCreateTimeSlotExceptionMutation()

    const handleCreateTimeSlotException =  () => {
        if(selectedDate && selectedSlot){
            const dateString = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`
        const payload = {
            date:dateString,
            time_slot:selectedSlot.id
        }
             createTimeSlotException(payload).unwrap()
    }else{
        alert('k')
    }
}

    return <div className="flex">
        <DatePicker dateSelected={selectedDate} setDateSelected={setSelectedDate}/>
        {selectedDate && currentArtist && <EchoverseTimeSlotPicker createSlotExceptionHandler={handleCreateTimeSlotException} date={selectedDate} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} artist={currentArtist}/>}
    </div>
}
