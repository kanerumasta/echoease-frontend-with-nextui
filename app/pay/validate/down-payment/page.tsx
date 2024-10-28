"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useFinalizeDownPaymentMutation } from "@/redux/features/paymentApiSlice";

export default function PaymentValidationPage() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent_id");
  const router = useRouter();
  const [finalizeDownPayment] = useFinalizeDownPaymentMutation();

  useEffect(() => {
    setTimeout(() => {
      handleFinalize();
    }, 2000);
  }, []);

  const handleFinalize = async () => {
    const payload = {
      payment_intent_id: paymentIntentId,
    };
    const responseData = await finalizeDownPayment(payload).unwrap();

    if (responseData) {
      console.log(responseData);
      if (responseData.booking_id)
        router.replace(`/bookings/${responseData.booking_id}`);
      else router.replace(`/bookings`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="w-[500px] h-[300px] flex flex-col items-center justify-center bg-white/90 rounded-lg">
        <Image
          alt={"Validating..."}
          className="animate-rotate-x"
          height={100}
          src={"/media/echo-bot.png"}
          width={100}
        />
        <p className="text-center w-full text-black/70 text-xl capitalize font-bold">
          Echobot is validating your payment.
        </p>
      </div>
    </div>
  );
}
