'use client'

import CustomImage from "@/components/image"
import { useFetchApprovedBookingsQuery, useFetchUpcomingEventsQuery } from "@/redux/features/bookingApiSlice"
import { BookInSchema } from "@/schemas/booking-schemas"
import { Image } from "@nextui-org/image"
import { Spacer } from "@nextui-org/spacer"
import { z } from "zod"

export default function UpcomingEventsPage() {
    const {data:approvedBookings, isLoading} = useFetchUpcomingEventsQuery()
    return (
        <div className="w-full flex flex-wrap gap-3">
            {approvedBookings?.map((booking) => (
                <EventCard booking={booking}/>
            ))}
        </div>
    )
}

const EventCard = ({booking}:{booking:z.infer<typeof BookInSchema>}) => {
    return (
        <div className="min-w-[250px] border-[1px] border-white/10 p-3 rounded-lg max-w-[250px]  bg-white/5 ">
            <Image isBlurred isZoomed width={250} src={`${process.env.NEXT_PUBLIC_HOST}${booking.client.profile?.profile_image}`}/>
            <Spacer y={4}/>
            <h1 className="text-2xl font-bold">{booking.event_name}</h1>
            <div className="text-white/50 text-xs capitalize">
            <p className="text-sm">{booking.client.fullname}</p>
            <p>{booking.location}</p>
            <p>{booking.formatted_event_date}</p>
            <p>{booking.formatted_start_time} - {booking.formatted_end_time}</p>
            </div>
        </div>
    )
}
