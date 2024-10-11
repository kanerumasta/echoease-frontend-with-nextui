'use client'

import useIsArtistOnly from "@/hooks/use-is-artist-only"
import useLoginRequired from "@/hooks/use-login-required"
import { useFetchMyBookingsQuery } from "@/redux/features/bookingApiSlice"
import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/spinner"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { notFound, useRouter } from "next/navigation"
import { ApprovedBookings } from "./components/approved"
import { CompleteBookings } from "./components/complete"
import PendingPayments from "@/app/bookings/components/pending-payments"
import { AwaitingDownpayments } from "@/app/bookings/components/awaiting-downpayment"
import { Spacer } from "@nextui-org/spacer"
import { PendingBookings } from "./components/pending"

export default function BookingsPage(){

    const { loginChecked } = useLoginRequired("/echoverse");
    const { isArtist, isLoading: artistLoading } = useIsArtistOnly();

    // login and isArtist checking
    if (!loginChecked || artistLoading) {
        return <div>Loading...</div>;
    }

    if (!artistLoading && !isArtist) {
        return notFound();
    }
    return <div className="space-y-2">
        <PendingBookings />
        <ApprovedBookings/>
        <CompleteBookings />
    </div>
}
