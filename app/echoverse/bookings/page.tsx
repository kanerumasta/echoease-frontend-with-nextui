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
import { Tab, Tabs } from "@nextui-org/tabs"
import { BookingHistory } from "./components/booking-history"
import { PendingBookingIcon } from "@/components/icons/pending-booking"
import { ApprovedBookingIcon } from "@/components/icons/approved-booking"
import { CompletedBookingIcon } from "@/components/icons/completed=booking"
import { BookingHistoryIcon } from "@/components/icons/booking-history"

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
        <Tabs   variant="underlined" classNames={{}} aria-label="bookings table">
            <Tab key="pending"  title={
            <div className="flex items-center space-x-2">

              <span>Pending</span>
            </div>
          }>
                <PendingBookings />
            </Tab>
            <Tab key="approved" title={
            <div className="flex items-center space-x-2">

              <span>Approved</span>
            </div>}>
                <ApprovedBookings />
            </Tab>
            <Tab key="completed" title={
            <div className="flex items-center space-x-2">

              <span>Completed</span>
            </div>}>
                <CompleteBookings />
            </Tab>
            <Tab key="booking-history" title={
            <div className="flex items-center space-x-2">

              <span>History</span>
            </div>}>
                <BookingHistory />
            </Tab>
        </Tabs>
    </div>
}
