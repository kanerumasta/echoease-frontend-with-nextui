import { TransactionSchema } from "@/schemas/transaction-schemas";
import { z } from "zod";

type TransactionProps = {
    transaction: z.infer<typeof TransactionSchema>;
};

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
    return (
        <div className="w-[400px] p-4 bg-white shadow-md rounded-lg border border-gray-300">

            <div className="mt-4">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Transaction ID:</span>
                    <span className="text-gray-500">{transaction.transaction_reference}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium text-gray-600">Date:</span>
                    <span  className="text-gray-500">{new Date(transaction.created_at).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium text-gray-600">Transaction Type:</span>
                    <span  className="text-gray-500">{transaction.transaction_type}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className={`text-gray-500 ${transaction.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.status}
                    </span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium text-gray-600">Amount:</span>
                    <span className="text-gray-500">&#8369;{parseFloat(transaction.amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium text-gray-600">Net Amount:</span>
                    <span className="text-gray-500">&#8369;{parseFloat(transaction.net_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-gray-600">siudhgf:</span>
                    <span className="text-gray-500">{transaction.payment_gateway === 'gcash'? <img width={80} src="/media/GCash-Logo.png"/> : transaction.payment_gateway === 'paymaya'? <img width={80} src="/media/paymaya.png"/> : transaction.payment_gateway}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium capitalize text-gray-600">{transaction.payment_gateway || "Service"} Fee:</span>
                    <span className="text-gray-500">&#8369;{parseFloat(transaction.service_fee).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium text-gray-600">Platform Fee:</span>
                    <span className="text-gray-500">&#8369;{parseFloat(transaction.platform_fee).toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-4 border-t border-gray-300 pt-4">
                <h3 className="text-md font-semibold text-gray-700">Payer Information</h3>
                <div className="flex justify-between mt-2">
                    <span className="font-medium text-gray-600">Name:</span>
                    <span className="text-gray-500">{transaction.payer_name}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="text-gray-500">{transaction.payer_email}</span>
                </div>
            </div>

            <div className="mt-4 border-t border-gray-300 pt-4">
                <h3 className="text-md font-semibold text-gray-700">Booking Details</h3>
                <div className="flex justify-between mt-2">
                    <span className="font-medium text-gray-600">Booking Reference:</span>
                    <span className="text-gray-500">{transaction.booking.booking_reference}</span>
                </div>
                {/* Add more booking details as needed */}
            </div>

            <div className="mt-4 text-gray-500 text-sm text-center">
                <p>Thank you for your business!</p>
            </div>
        </div>
    );
};
