import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React from "react";
import { z } from "zod";

import { PaymentButton } from "@/components/payment-button";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import {
  useAttachFinalPaymentMutation,
  useCreateFinalPaymentIntentMutation,
  useCreateInvoiceMutation,
} from "@/redux/features/paymentApiSlice";
import { BookInSchema } from "@/schemas/booking-schemas";

interface PaymentInfoProps {
  booking: z.infer<typeof BookInSchema>;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ booking }) => {

    const [createInvoice,{isLoading}] = useCreateInvoiceMutation();

  const handlePayNowClick = async () => {
    const payload = {
      booking_id: booking.id.toString(),
      payment_type:'final_payment',
      redirect_url:process.env.NEXT_PUBLIC_SITE ?  `${process.env.NEXT_PUBLIC_SITE}/bookings/${booking.id.toString()}` : `http://localhost:3000/bookings/${booking.id.toString()}`
    };

    const invoice = await createInvoice(payload).unwrap();
    window.location.href = invoice?.invoice_url
  };

  return (
    <div className="min-w-[400px] bg-white/5 p-2 rounded-md">
        <div className=" bg-white shadow-lg rounded-lg p-6 ">
      {/* Booking Reference */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-700">
          Booking Reference
        </h3>
        <p className="text-sm text-gray-600">{booking.booking_reference}</p>
      </div>

      {/* Event Name */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-700">Event Name</h3>
        <p className="text-sm text-gray-600">{booking.event_name}</p>
      </div>

      {/* Event Date */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-700">Event Date</h3>
        <p className="text-sm text-gray-600">{booking.formatted_event_date}</p>
      </div>

      {/* Total Amount */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-700">Total Amount</h3>
        <p className="text-sm text-gray-600">₱{booking.rate.amount}</p>
      </div>

      {/* Downpayment */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-700">Downpayment Paid</h3>
        <p className="text-sm text-gray-600">₱{booking.downpayment_amount}</p>
      </div>

      {/* Service Fee */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-700">Amount to Pay</h3>
        <p className="text-sm text-gray-600">₱{booking.rate.amount - booking.downpayment_amount}</p>
      </div>


      {/* Payment Status */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-700">Booking Status</h3>
        <p
          className={`text-sm font-bold ${
            booking.status === "paid" || booking.status === "approved" ? "text-green-500" : "text-red-500"
          }`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </p>
      </div>

      {/* Transaction Date */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-700">
          Transaction Date
        </h3>
        <p className="text-sm text-gray-600">
          {new Date(booking.created_at).toLocaleDateString()}
        </p>
      </div>

      {booking.is_event_due && (
        <Button
          fullWidth
          className=""
          color="primary"
         isLoading={isLoading}
          radius="sm"
          size="lg"
          onPress={handlePayNowClick}
        >
          Pay Final Payment Now
        </Button>
      )}
      </div>

    </div>
  );
};

export default PaymentInfo;
