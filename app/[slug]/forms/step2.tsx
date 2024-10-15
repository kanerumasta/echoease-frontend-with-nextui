import { useFetchArtistUnavailableDatesQuery } from "@/redux/features/scheduleApiSlice"
import { TimeSlotSchema } from "@/schemas/booking-schemas"
import { Fragment, useState } from "react"
import { z } from "zod"
import { AddressPicker } from "../components/address-picker"
import { useBookingContext } from "./booking-provider"

export const Step2 = () =>{
    const {artist} = useBookingContext()
    const provinceCode = "072200000"; //CEBU
    const {data:unavailableDates = []}  = useFetchArtistUnavailableDatesQuery(artist.id)
    return <Fragment>
                  <AddressPicker provinceCode={provinceCode}/>
        </Fragment>
}
