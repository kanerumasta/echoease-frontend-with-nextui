'use client'
import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice";
import { useFetchMyUnavailableDatesQueryQuery } from "@/redux/features/scheduleApiSlice";
import { InTimeslotSchema } from "@/schemas/artist-schemas";
import { useMemo, useState } from "react";
import { z } from "zod";
import { DatePicker } from "./components/custom-date-picker";
import { SetDateUnavailable } from "./components/set-date-unavailable";

export default function SchedulePage(){
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const {data:currentArtist} = useFetchDetailCurrentArtistQuery()
    const [selectedSlot, setSelectedSlot] = useState<z.infer<typeof InTimeslotSchema>|null>(null)
    const { data: unavailableDates =[] } = useFetchMyUnavailableDatesQueryQuery()

    const extractedDates:Date[] = useMemo(() => {
        return unavailableDates.map((date)=>new Date(date.date))
    }, [unavailableDates])

    const isDateUnavailable = (date:Date) => {
        return extractedDates.some(unavailableDate =>
            date.getFullYear() === unavailableDate.getFullYear() &&
            date.getMonth() === unavailableDate.getMonth() &&
            date.getDate() === unavailableDate.getDate()
        );
    };

    return <div className="flex">
            {
                unavailableDates && currentArtist &&
        <div>

                <DatePicker  unavailableDates={unavailableDates} dateSelected={selectedDate} setDateSelected={setSelectedDate} />
        </div>
            }
        <SetDateUnavailable date={selectedDate} />

    </div>
}
