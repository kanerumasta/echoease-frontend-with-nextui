import React from 'react';
import { z } from 'zod';
import { BookInSchema } from '@/schemas/booking-schemas';
import { Button } from '@nextui-org/button';
import { useAttachFinalPaymentMutation, useCreateFinalPaymentIntentMutation } from '@/redux/features/paymentApiSlice';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { useFetchCurrentUserQuery } from '@/redux/features/authApiSlice';
import CustomImage from '@/components/image';
import { Spinner } from '@nextui-org/spinner';
import { PaymentButton } from '@/components/payment-button';

interface PaymentInfoProps {
  booking: z.infer<typeof BookInSchema>; // Use the inferred Zod schema type
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ booking }) => {
    const [createFinalPayment,{data:intentData, isLoading:loadingIntent}] = useCreateFinalPaymentIntentMutation()
    const {data:currentUser} = useFetchCurrentUserQuery()
    const [attachFinalPayment,{isLoading:loadingAttach}] = useAttachFinalPaymentMutation()
    const {onOpen, onOpenChange, onClose, isOpen} = useDisclosure()
    const handlePayNowClick = async () => {
        const payload = {
            "booking":booking.id
        }

        await createFinalPayment(payload)
        onOpen()
    }

    const handlePayWithMethod = async (booking:z.infer<typeof BookInSchema>, method:"gcash"|"paymaya") => {
        const payload = {
            payment_intent_id: intentData?.payment_intent_id,
            payment_method: method,
            booking: booking.id,
            return_url: `${process.env.NEXT_PUBLIC_SITE}/pay/validate/final-payment`,
            email: currentUser?.email,
            name:currentUser?.fullname
        }

        const response = await attachFinalPayment(payload)

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

      <Button isLoading={loadingIntent} onPress={handlePayNowClick} size='lg' className='' color='primary' radius='sm' fullWidth>Pay Final Payment Now</Button>
      <Modal classNames={ {base:'bg-white text-black',header:'bg-blue-500 text-white',closeButton:'text-white hover:bg-white/30'}} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Pay Downpayment</ModalHeader>
                <ModalBody>

                    <div>
                        <h1 className="text-center font-bold text-lg">Pay with</h1>
                        <div className="fles items-center justify-center">
                            <div className="flex justify-center gap-4 p-3">
                            {currentUser && intentData &&
                            <>
                                <PaymentButton onPayHandler={attachFinalPayment} paymentIntentId={intentData?.payment_intent_id} bookingId={booking.id} paymentGateway={"gcash"} src={"/media/GCash-Logo.png"} currentUser={currentUser}/>

                                <PaymentButton onPayHandler={attachFinalPayment} paymentIntentId={intentData?.payment_intent_id} bookingId={booking.id} paymentGateway={"paymaya"} src={"/media/paymaya.png"} currentUser={currentUser}/>
                                </>
                            }
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
  );
};

export default PaymentInfo;
