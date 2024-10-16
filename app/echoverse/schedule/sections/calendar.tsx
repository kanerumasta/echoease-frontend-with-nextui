import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice"
import { useFetchArtistUnavailableDatesQuery } from "@/redux/features/scheduleApiSlice"
import { skipToken } from "@reduxjs/toolkit/query"
import { useState } from "react"
import { DatePicker } from "../components/custom-date-picker"

export default function ArtistCalendar(){
    const {data:artist, isSuccess:artistFulfilled} = useFetchDetailCurrentArtistQuery()
    const {data:unavailableDates=[]} = useFetchArtistUnavailableDatesQuery(artistFulfilled ? artist.id : skipToken)
    const [selectedDate, setSelectedDate] = useState(new Date())
    console.log(artist)
    console.log(unavailableDates)
    return <div>

<DatePicker dateSelected={selectedDate} setDateSelected={setSelectedDate} unavailableDates={unavailableDates}/>

    </div>
}
