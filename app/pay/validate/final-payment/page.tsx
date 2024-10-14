'use client'
import { useFinalizeDownPaymentMutation, useFinalizeFinalPaymentMutation } from "@/redux/features/paymentApiSlice";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentValidationPage ( ){
    const searchParams = useSearchParams()
    const paymentIntentId = searchParams.get('payment_intent_id')
    const router = useRouter()
    const [finalizeFinalPayment] = useFinalizeFinalPaymentMutation()

    useEffect(()=>{
        setTimeout(() => {
            handleFinalize()
        }, 2000);
    },[])

    const handleFinalize = async () => {
        const payload = {
            "payment_intent_id":paymentIntentId
        }
        const responseData = await finalizeFinalPayment(payload).unwrap()
        if(responseData){

            console.log(responseData)
            if(responseData.booking_id)
                router.replace(`/bookings/${responseData.booking_id}`)
            else
                router.replace(`/bookings`)

        }
    }

    return (
        <div className="h-screen flex items-center justify-center w-full">
            <div className="w-[500px] h-[300px] flex flex-col items-center justify-center bg-white/90 rounded-lg">
                    <Image alt={"Validating..."} width={100} height={100} className="animate-rotate-x" src={"/media/echo-bot.png"}/>
                    <p className="text-center w-full text-black/70 text-xl capitalize font-bold">Echobot is validating your payment.</p>
            </div>
        </div>
    )
}
