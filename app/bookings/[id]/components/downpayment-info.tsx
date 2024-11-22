import React from "react";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import { BookInSchema } from "@/schemas/booking-schemas";
import {
  useAttachDownPaymentIntentMutation,
  useCreateDownPaymentIntentMutation,
  useCreateInvoiceMutation,
} from "@/redux/features/paymentApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";

interface DownpaymentInfoProps {
  booking: z.infer<typeof BookInSchema>; // Use the inferred Zod schema type
}

const DownpaymentInfo: React.FC<DownpaymentInfoProps> = ({ booking }) => {
  const { data: currentUser } = useFetchCurrentUserQuery();
  const [createDownPaymentIntent, { data }] =
    useCreateDownPaymentIntentMutation();
  const [createInvoice, { data: invoiceData }] = useCreateInvoiceMutation();
  const [attachDownPaymentIntent] = useAttachDownPaymentIntentMutation();
  const { onOpen, onOpenChange, onClose, isOpen } = useDisclosure();

  const handlePayNowClick = async () => {
    const payload = {
      booking_id: booking.id.toString(),
      payment_type: "downpayment",
      redirect_url: process.env.NEXT_PUBLIC_SITE
        ? `${process.env.NEXT_PUBLIC_SITE}/bookings/${booking.id.toString()}`
        : `http://localhost:3000/bookings/${booking.id.toString()}`,
    };

    const invoice = await createInvoice(payload).unwrap();

    if (typeof window !== "undefined")
      window.location.href = invoice?.invoice_url;
    // onOpen();
  };

  return (
    <div className="min-w-[400px] bg-white shadow-lg rounded-lg p-6">
      {/* Booking Reference */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Booking Reference
        </h3>
        <p className="text-gray-600">{booking.booking_reference}</p>
      </div>

      {/* Event Name */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Event Name</h3>
        <p className="text-gray-600">{booking.event_name}</p>
      </div>

      {/* Event Date */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Event Date</h3>
        <p className="text-gray-600">{booking.formatted_event_date}</p>
      </div>
      {/* Package Name */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Package</h3>
        <p className="text-gray-600">{booking.rate.name}</p>
      </div>
      {/* Package Amount*/}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Package Amount</h3>
        <p className="text-gray-600">₱{booking.rate.amount}</p>
      </div>

      {/* Total Amount */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Total Amount</h3>
        <p className="text-gray-600">₱{booking.rate.amount}</p>
      </div>

      {/* Downpayment Required */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Required Downpayment
        </h3>
        <p className="text-gray-600">₱{booking.downpayment_amount}</p>
      </div>

      {/* Remaining Balance */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Remaining Balance (Due Later)
        </h3>
        <p className="text-gray-600">
          ₱{booking.rate.amount - booking.downpayment_amount}
        </p>
      </div>

      {/* Payment Status */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Downpayment Status
        </h3>
        <p
          className={`text-sm font-bold ${
            booking.status === "downpayment_paid"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {booking.status === "downpayment_paid" ? "Paid" : "Pending"}
        </p>
      </div>

      {/* Transaction Date */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Transaction Date
        </h3>
        <p className="text-gray-600">
          {new Date(booking.created_at).toLocaleDateString()}
        </p>
      </div>

      <Button
        fullWidth
        color="primary"
        radius="sm"
        size="lg"
        onPress={handlePayNowClick}
      >
        Pay Down Payment Now
      </Button>
    </div>
  );
};

export default DownpaymentInfo;
