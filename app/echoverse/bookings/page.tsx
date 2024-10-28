"use client";

import { notFound } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/tabs";

import useLoginRequired from "@/hooks/use-login-required";
import useIsArtistOnly from "@/hooks/use-is-artist-only";

import { PendingBookings } from "./components/pending";
import { CompleteBookings } from "./components/complete";
import { ApprovedBookings } from "./components/approved";
import { BookingHistory } from "./components/booking-history";

export default function BookingsPage() {
  const { loginChecked } = useLoginRequired("/echoverse");
  const { isArtist, isLoading: artistLoading } = useIsArtistOnly();

  // login and isArtist checking
  if (!loginChecked || artistLoading) {
    return <div>Loading...</div>;
  }

  if (!artistLoading && !isArtist) {
    return notFound();
  }

  return (
    <div className="space-y-2">
      <Tabs aria-label="bookings table" classNames={{}} variant="underlined">
        <Tab
          key="pending"
          title={
            <div className="flex items-center space-x-2">
              <span>Pending</span>
            </div>
          }
        >
          <PendingBookings />
        </Tab>
        <Tab
          key="approved"
          title={
            <div className="flex items-center space-x-2">
              <span>Approved</span>
            </div>
          }
        >
          <ApprovedBookings />
        </Tab>
        <Tab
          key="completed"
          title={
            <div className="flex items-center space-x-2">
              <span>Completed</span>
            </div>
          }
        >
          <CompleteBookings />
        </Tab>
        <Tab
          key="booking-history"
          title={
            <div className="flex items-center space-x-2">
              <span>History</span>
            </div>
          }
        >
          <BookingHistory />
        </Tab>
      </Tabs>
    </div>
  );
}
