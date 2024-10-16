import { BookInSchema } from "@/schemas/booking-schemas"
import { Button } from "@nextui-org/button"
import { z } from "zod"

type BookingSummaryProps = {
    booking : z.infer<typeof BookInSchema>
}

export const BookingSummary:React.FC<BookingSummaryProps> = ({booking}) => {
    console.log(booking.downpayment_amount)
    console.log('fee', booking.service_fee)
    return <div className="p-4 bg-white rounded-lg text-black capitalize">
            <h1 className="text-lg font-bold text-black/50">Summary</h1>
            <div className="px-2">
                <div className="flex justify-between">
                <h2 className="text-lg">Echoee: </h2>
                <span className="font-bold">{booking.artist.user.fullname}</span>
                </div>
                <div className="flex justify-between">
                <h2 className="">Event Date: </h2>
                <span>{booking.formatted_event_date}</span>
                </div>
                <div className="flex justify-between">
                <h2>Time: </h2>
                <span>{booking.formatted_start_time} - {booking.formatted_end_time}</span>
                </div>
                <div className="flex justify-between">
                <h2>Location: </h2>
                <span className="text-xs text-black/50">{booking.location}</span>
                </div>
                <div className="flex justify-between">
                <h2>Package: </h2>
                <span>{booking.rate.name}</span>
                </div>
                <div className="flex justify-between">
                <h2>Package Amount: <span>{booking.rate.amount}</span></h2>
                </div>
                <h2>Downpayment Paid: <span>{booking.downpayment_amount - booking.service_fee}</span></h2>
                <div className="flex justify-between">
                <h2>Total </h2>
                <span className="text-2xl font-black">&#8369;7000</span>
                </div>
                <Button color="primary" fullWidth>Pay Now</Button>
            </div>
    </div>
}
