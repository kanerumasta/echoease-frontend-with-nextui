import React from "react";

import { Section } from "@/components/section";

export default function BookingPolicyPage() {
  return (
    <div>
      <BookingPolicy />
    </div>
  );
}

const BookingPolicy = () => {
  return (
    <div className="max-w-3xl my-12 mx-auto p-6 bg-white/10 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">EchoEase Booking Policy</h1>

      <Section title="1. Introduction">
        <p>
          Welcome to EchoEase! This booking policy outlines the terms and
          conditions that apply when making a booking through our platform.
          Please review this policy carefully before making or accepting a
          booking.
        </p>
      </Section>

      <Section title="2. Definitions">
        <ul className="list-disc ml-6">
          <li>
            <strong>Artist:</strong> Refers to any singer or performer available
            for booking on the EchoEase platform.
          </li>
          <li>
            <strong>Customer:</strong> Refers to any individual, organization,
            or entity booking an artist.
          </li>
          <li>
            <strong>Booking:</strong> A confirmed agreement between a customer
            and an artist to perform on a specific date and location.
          </li>
          <li>
            <strong>Contract:</strong> The formal agreement between the artist
            and the customer that must be approved after booking confirmation.
          </li>
        </ul>
      </Section>

      <Section title="3. Booking Process">
        <ul className="list-disc ml-6">
          <li>
            Booking Request: Customers can browse artist profiles and send a
            booking request for specific rates, dates and times.
          </li>
          <li>
            Artist Confirmation: The artist has{" "}
            <span className=" font-semibold">24 hours</span> to confirm or
            decline the booking request.
          </li>
          <li>
            Contract Approval: After artist confirmation, customers must approve
            a contract detailing the terms of the booking.
          </li>
          <li>
            Final Confirmation: Once the contract is approved, the booking is
            considered finalized.
          </li>
        </ul>
      </Section>

      <Section title="4. Payment Policy">
        <ul className="list-disc ml-6">
          <li>
            <strong>Rates:</strong> Each artist sets their own rates, which are
            visible on their profile. Rates may vary depending on the type of
            event and additional services requested.
          </li>
          <li>
            <strong>Payment Collection:</strong> Payment will be collected after
            the event has been successfully completed.
          </li>
          <li>
            <strong>Payment Methods:</strong> After the event, EchoEase accepts
            payments via [PayPal, PayMongo, etc.].
          </li>
        </ul>
      </Section>
      <Section title="5. Cancellations and Event Changes">
        <ul className="list-disc ml-6">
          <li>
            <strong>Booking Restrictions:</strong> Clients cannot book an event
            for the current day. Bookings must be made for the following day or
            later.
          </li>
          <li>
            <strong>Cancellations for Events within 1-2 Days:</strong> If the
            event is scheduled within 1 or 2 days, cancellations must be made no
            later than 20 hours before the event's start time to avoid any
            penalties.
          </li>
          <li>
            <strong>Cancellations for Events 3 Days or More in Advance:</strong>{" "}
            For events scheduled 3 or more days in advance, cancellations must
            be made at least 2 days before the event to avoid any penalties.
          </li>
          <li>
            <strong>Post-Event Payment:</strong> Since payment is only collected
            after the event, no refunds or deductions apply for cancellations.
            However, failure to adhere to the cancellation policy may result in
            penalties or additional charges at the discretion of the platform or
            artist.
          </li>
        </ul>
      </Section>

      <Section title="6. No-Show Policy">
        <ul className="list-disc ml-6">
          <li>
            <strong>Customer No-Show:</strong> If the customer fails to show up
            at the agreed time and location without prior cancellation, no
            refund will be provided.
          </li>
          <li>
            <strong>Artist No-Show:</strong> If an artist fails to show up,
            customers will receive a full refund, and the artist may be subject
            to penalties.
          </li>
        </ul>
      </Section>

      <Section title="7. Dispute Resolution">
        <p>
          If there is a dispute between the customer and the artist regarding
          the booking, EchoEase will mediate the issue and, where applicable,
          offer refunds or other remedies based on our investigation.
        </p>
      </Section>

      <Section title="8. Liability">
        <p>
          EchoEase acts as a booking platform and is not responsible for any
          personal injuries, property damage, or other issues that may arise
          during an event. Both the customer and the artist agree to release
          EchoEase from any liability.
        </p>
      </Section>

      <Section title="9. Policy Updates">
        <p>
          This policy may be updated from time to time. The latest version will
          be made available on the EchoEase platform, and customers and artists
          will be notified of any significant changes.
        </p>
      </Section>

      <Section title="10. Contact Us">
        <p>
          For questions or concerns regarding this booking policy, feel free to
          contact us at echomata.watael.
        </p>
      </Section>
    </div>
  );
};
