import { z } from "zod";

import { TransactionSchema } from "@/schemas/transaction-schemas";
import Image from "next/image";

type TransactionProps = {
  transaction: z.infer<typeof TransactionSchema>;
};

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  return (
    <div className="w-[400px] p-4 bg-white shadow-md rounded-lg border border-gray-300">
      <div className="mt-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Transaction ID:</span>
          <span className="text-gray-500">

            {transaction.transaction_reference}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium text-gray-600">Date:</span>
          <span className="text-gray-500">
            {new Date(transaction.created_at).toDateString().slice(4)}
            {', '}
            {new Date(transaction.created_at).toLocaleTimeString()}

          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium text-gray-600">Transaction Type:</span>
          <span className="text-gray-500 capitalize">{transaction.transaction_type.split('_').join(' ')}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium text-gray-600">Status:</span>
          <span
            className={`${transaction.transaction_type === 'refund' || transaction.transaction_type === 'payout' ? "#006fee":"text-[#17c964]"}`}
          >
            Success
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium text-gray-600">Amount:</span>
          <span className="text-gray-500">
            &#8369;{parseFloat(transaction.amount).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
        <span className="font-medium text-gray-600">Payment Channel:</span>
          <span className="text-gray-500">
            {transaction.payment.payer_channel?.toLowerCase() === "gcash" ? (
              <img src="/media/GCash-Logo.png" width={80} />
            ) : transaction.payment.payer_channel?.toLowerCase() === "paymaya" ? (
              <img src="/media/paymaya.png" width={80} />
            ) : transaction.payment.payer_channel?.toLowerCase() === "grabpay" ? (
                <img src="/media/grabpay.png" width={80} />
              ) :(
                transaction.payment.payer_channel
            )}
          </span>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-300 pt-4">
        <h3 className="text-md font-semibold text-gray-700">
          Additional Information
        </h3>
        {transaction.transaction_type === 'downpayment' || transaction.transaction_type === 'final_payment' || transaction.transaction_type === 'refund' ?
        <div className="flex justify-between mt-2">
          <span className="font-medium text-gray-600">Name:</span>
          <span className="text-gray-500">{transaction.booking.client.fullname}</span>
        </div> :  transaction.transaction_type === 'payout' ?
        <div className="flex justify-between mt-2">
        <span className="font-medium text-gray-600">Name:</span>
        <span className="text-gray-500">{transaction.booking.artist.user.fullname}</span>
      </div> : null
        }
        <div className="flex justify-between mt-2">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-500">{transaction.payment.payer_email}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-300 pt-4">
        <h3 className="text-md font-semibold text-gray-700">Booking Details</h3>
        <div className="flex justify-between mt-2">
          <span className="font-medium text-gray-600">Booking Reference:</span>
          <span className="text-gray-500">
            {transaction.booking.booking_reference}
          </span>
        </div>
        {/* Add more booking details as needed */}
      </div>

      <div className="mt-4 text-gray-500 text-sm text-center">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
};
