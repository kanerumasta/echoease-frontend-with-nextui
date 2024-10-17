
'use client'
import { z } from "zod";
import CustomImage from "./image";
import { UserSchema } from "@/schemas/user-schemas";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";

type PaymentButtonProps = {
  onPayHandler: (payload: any) => Promise<any>;
  paymentIntentId: string;
  bookingId: number;
  paymentGateway: string;
  src: string;
  currentUser: z.infer<typeof UserSchema>;
};

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  onPayHandler,
  bookingId,
  paymentIntentId,
  paymentGateway,
  src,
  currentUser,
}) => {
  const [loadingAttach, setLoadingAttach] = useState(false);

  const handlePayWithMethod = async () => {
    setLoadingAttach(true);
    try {
      const payload = {
        payment_intent_id: paymentIntentId,
        payment_method: paymentGateway,
        booking: bookingId,
        return_url: `${process.env.NEXT_PUBLIC_SITE}/pay/validate/final-payment`,
        email: currentUser.email,
        name: currentUser.fullname,
      };

      const response = await onPayHandler(payload);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoadingAttach(false);
    }
  };

  return (
    <div
      onClick={handlePayWithMethod}
      className="border-3 hover:cursor-pointer hover:bg-blue-500/20 border-blue-500/50 h-[100px] w-[150px] flex items-center justify-center rounded-xl"
    >
      {loadingAttach ? <Spinner /> : <CustomImage width="100px" height="60px" src={src} />}
    </div>
  );
};
