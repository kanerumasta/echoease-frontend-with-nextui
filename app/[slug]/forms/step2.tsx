import { Fragment, useState } from "react"
import { CustomDatePicker } from "../components/custom-datepicker"
import { useFetchArtistUnavailableDatesQuery } from "@/redux/features/scheduleApiSlice"
import { useBookingContext } from "./booking-provider"
import { Input } from "@nextui-org/input"
import { AddressPicker } from "../components/address-picker"
import { TimeSlotPicker } from "../components/time-slot-picker"
import { TimeSlotSchema } from "@/schemas/booking-schemas"
import { z } from "zod"

export const Step2 = () =>{
    const {artist} = useBookingContext()
    const provinceCode = "072200000"; //CEBU

    const [selectedTimeSlot, setSelectedTimeSlot] = useState<z.infer<typeof TimeSlotSchema>|null>(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const {data:unavailableDates = []}  = useFetchArtistUnavailableDatesQuery(artist.id)
    return <Fragment>
                  <AddressPicker provinceCode={provinceCode}/>

        </Fragment>
}
