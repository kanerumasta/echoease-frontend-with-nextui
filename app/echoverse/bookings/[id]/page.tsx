'use client'

import EchoLoading from "@/components/echo-loading";
import { UserRoles } from "@/config/constants";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useConfirmBookingMutation, useFetchBookingDetailQuery } from "@/redux/features/bookingApiSlice";
import { Button } from "@nextui-org/button";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { Heading } from "./components/heading";
import ClientDetails from "./components/client-details";
import BasicBookingInfo from "./components/basic";
import BookingProgress from "@/components/booking-status-progress";
import { CreateDispute } from "./components/create-dispute";
import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice";
import { Spacer } from "@nextui-org/spacer";
import { ApproveBooking } from "./components/approve-booking";
import { DeclineBooking } from "./components/decline-booking";
import { useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";
import { useEffect } from "react";

export default function BookingDetailPage(){
    const params = useParams<{id:string}>()
    const {data:currentArtist} = useFetchDetailCurrentArtistQuery()
    const {refetch:refetchNotif} = useFetchNewNotificationsQuery()
    const router = useRouter()
    const {data:booking,isLoading} = useFetchBookingDetailQuery(params.id)
    const [confirmBooking, { isLoading: isConfirmBookingLoading, isError: isConfirmBookingError }] = useConfirmBookingMutation()

    useEffect(()=>{
        refetchNotif()
    },[])


    const handleConfirmBooking = () => {
        confirmBooking(params.id)
    }

    return <div>
            {/* Header */}
            {booking &&
            <>
            <Heading booking={booking}/>
            <BookingProgress status={booking.status}/>
            <div className="lg:flex gap-2 mt-2">
            <BasicBookingInfo booking={booking} />
            <ClientDetails booking={booking}/>
            </div>
            <Spacer y={4}/>
            <div className="flex gap-2 w-full justify-end">
            {currentArtist && booking.is_completed && <CreateDispute artistId={currentArtist.id} booking={booking}/> }
            {booking.status === 'pending' && <DeclineBooking bookingId={booking.id}/>}
            {booking.status === 'pending' && <ApproveBooking bookingId={booking.id}/> }
            </div>
            </>
            }

    </div>
}
