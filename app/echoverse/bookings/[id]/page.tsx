'use client'

import EchoLoading from "@/components/echo-loading";
import { UserRoles } from "@/config/constants";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useConfirmBookingMutation, useFetchBookingDetailQuery } from "@/redux/features/bookingApiSlice";
import { Button } from "@nextui-org/button";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

export default function BookingDetailPage(){
    const params = useParams<{id:string}>()
    const router = useRouter()
    const {data:booking,isLoading} = useFetchBookingDetailQuery(params.id)
    const [confirmBooking, { isLoading: isConfirmBookingLoading, isError: isConfirmBookingError }] = useConfirmBookingMutation()


    const handleConfirmBooking = () => {
        confirmBooking(params.id)
    }

    return <div>
        <div className="hover:cursor-pointer p-2" onClick={()=>router.back()}>
        <IoChevronBack />
        </div>
        {booking &&
        (
        <>
            <p>{booking.event_name}</p>
            <p>{booking.formatted_event_date}</p>
            {booking.status === 'pending' &&
                <Button onPress={handleConfirmBooking}>Confirm</Button>
}
        </>
        )
}

    </div>
}
