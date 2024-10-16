import React from 'react';
import { z } from 'zod';
import { BookInSchema } from '@/schemas/booking-schemas';
import { Button } from '@nextui-org/button';
import { useAttachDownPaymentIntentMutation, useCreateDownPaymentIntentMutation } from '@/redux/features/paymentApiSlice';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import CustomImage from '@/components/image';
import { useFetchCurrentUserQuery } from '@/redux/features/authApiSlice';

interface DownpaymentInfoProps {
  booking: z.infer<typeof BookInSchema>; // Use the inferred Zod schema type
}

const DownpaymentInfo: React.FC<DownpaymentInfoProps> = ({ booking }) => {
    const {data:currentUser} = useFetchCurrentUserQuery()
    const [createDownPaymentIntent,{data}] = useCreateDownPaymentIntentMutation()
    const [attachDownPaymentIntent] = useAttachDownPaymentIntentMutation()
    const {onOpen, onOpenChange, onClose, isOpen} = useDisclosure()

    const handlePayNowClick = async () => {
        const payload = {
            "booking":booking.id
        }

        await createDownPaymentIntent(payload)
        onOpen()
    }

    const handlePayWithMethod = async (booking:z.infer<typeof BookInSchema>, method:"gcash"|"paymaya") => {
        const payload = {
            payment_intent_id: data?.payment_intent_id,
            payment_method: method,
            booking: booking.id,
            return_url: `${process.env.NEXT_PUBLIC_SITE}/pay/validate/down-payment`,
            email: currentUser?.email,
            name:currentUser?.fullname
        }

        const response = await attachDownPaymentIntent(payload)

        window.location.href = response.data.url

    }
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
        <h3 className="text-lg font-semibold text-gray-700">Required Downpayment</h3>
        <p className="text-gray-600">₱{booking.downpayment_amount}</p>
      </div>

      {/* Remaining Balance */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Remaining Balance (Due Later)</h3>
        <p className="text-gray-600">₱{booking.rate.amount - booking.downpayment_amount}</p>
      </div>


      {/* Payment Status */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Downpayment Status</h3>
        <p
          className={`text-sm font-bold ${
            booking.status === 'downpayment_paid' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {booking.status === 'downpayment_paid' ? 'Paid' : 'Pending'}
        </p>
      </div>

      {/* Transaction Date */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Transaction Date</h3>
        <p className="text-gray-600">{new Date(booking.created_at).toLocaleDateString()}</p>
      </div>

      <Button onPress={handlePayNowClick} color='primary' size='lg' radius='sm' fullWidth>Pay Down Payment Now</Button>
      <Modal classNames={ {base:'bg-white text-black',header:'bg-blue-500 text-white',closeButton:'text-white hover:bg-white/30'}} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Pay Downpayment</ModalHeader>
                <ModalBody>

                    <div>
                        <h1 className="text-center font-bold text-lg">Pay with</h1>
                        <div className="fles items-center justify-center">
                            <div className="flex justify-center gap-4 p-3">
                                <div onClick={()=>handlePayWithMethod(booking, "gcash")}  className="border-3 hover:cursor-pointer hover:bg-blue-500/20 border-blue-500/50 p-3 rounded-xl">
                            <CustomImage width="100px" height="60px" src="/media/GCash-Logo.png"/>
                                </div>
                                <div onClick={()=>handlePayWithMethod(booking, "paymaya")} className="border-3 hover:cursor-pointer hover:bg-green-500/20 border-green-500/50 p-3 rounded-xl">
                            <CustomImage width="100px" height="60px" src="/media/paymaya.png"/>
                            </div>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
  );
};

export default DownpaymentInfo;
