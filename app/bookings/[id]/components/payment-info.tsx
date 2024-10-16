import React from 'react';
import { z } from 'zod';
import { BookInSchema } from '@/schemas/booking-schemas';

interface PaymentInfoProps {
  booking: z.infer<typeof BookInSchema>; // Use the inferred Zod schema type
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ booking }) => {
  return (
    <div className="min-w-[400px] bg-white shadow-lg rounded-lg p-6 my-4">
      {/* Booking Reference */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Booking Reference</h3>
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

      {/* Total Amount */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Total Amount</h3>
        <p className="text-gray-600">₱{booking.rate.amount}</p>
      </div>

      {/* Downpayment */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Downpayment</h3>
        <p className="text-gray-600">₱{booking.downpayment_amount}</p>
      </div>


      {/* Service Fee */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Service Fee</h3>
        <p className="text-gray-600">₱{booking.service_fee}</p>
      </div>

      {/* Net Amount */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Net Amount</h3>
        <p className="text-gray-600">₱{(booking.rate.amount - booking.service_fee)}</p>
      </div>

      {/* Payment Status */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Payment Status</h3>
        <p
          className={`text-sm font-bold ${
            booking.status === 'paid' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </p>
      </div>

      {/* Transaction Date */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Transaction Date</h3>
        <p className="text-gray-600">{new Date(booking.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PaymentInfo;
