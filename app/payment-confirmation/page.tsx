"use client";
import { useCapturePayment } from "@/hooks/payment";
import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function PaymentConfirmationPage() {
  const { onSubmit, isLoading, isError, responseData, isSuccess } =
    useCapturePayment();

  const searchParams = useSearchParams();
  console.log(searchParams.get("token"));
  // console.log(searchParams.get())

  const token = searchParams.get("token");

  const handleContinue = () => {
    if (!token) {
      return;
    }
    const payload = {
      order_id: token,
    };

    onSubmit(payload);
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div>
      <Button onClick={handleContinue} isLoading={isLoading} color="primary">
        Continue
      </Button>
    </div>
    </Suspense>
  );
}
