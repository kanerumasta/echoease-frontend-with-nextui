"use client";

import { useCreateOrderMutation } from "@/redux/features/paymentApiSlice";
import { useEffect } from "react";

export default function useCreateOrder() {
  const [createOrder, { isLoading, isError, isSuccess, data }] =
    useCreateOrderMutation();

  const onSubmit = (formData: any) => {
    createOrder(formData).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = data?.payer_action || "/";
    }
  }, [isSuccess]);

  return {
    onSubmit,
    isLoading,
    isError,
    isSuccess,
    data,
  };
}
