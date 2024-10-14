'use client'

import { useFetchApprovedBookingsQuery, useFetchUpcomingEventsQuery } from "@/redux/features/bookingApiSlice"
import { BookInSchema } from "@/schemas/booking-schemas"
import { z } from "zod"

export default function UpcomingEventsPage() {
    const {data:approvedBookings = [], isLoading} = useFetchUpcomingEventsQuery()
    return (
        <div className="w-full flex gap-3 overflow-x-scroll">
            {approvedBookings.map((booking) => (
                <EventCard booking={booking}/>
            ))}
        </div>
    )
}

const EventCard = ({booking}:{booking:z.infer<typeof BookInSchema>}) => {
    return (
        <div className="min-w-[300px] p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 h-[200px] bg-white/20">
            <h1 className="text-2xl font-bold">{booking.event_name}</h1>
            <p>{booking.location}</p>
            <p>{booking.event_date}</p>

        </div>
    )
}
