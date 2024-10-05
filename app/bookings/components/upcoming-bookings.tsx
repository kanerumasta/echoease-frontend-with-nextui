import { BookInSchema } from "@/schemas/booking-schemas"
import { z } from "zod"
import { BookingCard } from "./booking-card"

type Props = {
    bookings : z.infer<typeof BookInSchema>[]
}


export default function UpcomingBookings({bookings}:Props){
    return <div className="flex w-full overflow-x-scroll gap-2 scrollbar-hide">
{bookings.map((booking)=>(
    <BookingCard booking={booking}/>
))}
    </div>
}
