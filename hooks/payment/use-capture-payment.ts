import { useCapturePaymentMutation } from "@/redux/features/paymentApiSlice";
import { toast } from "react-toastify";
export default function useCapturePayment() {
  const [
    capturePayment,
    { isLoading, isError, isSuccess, data: responseData },
  ] = useCapturePaymentMutation();

  const onSubmit = (data: any) => {
    capturePayment(data)
      .unwrap()
      .then(() => toast.success("success"));
  };

  return {
    onSubmit,
    isLoading,
    isError,
    isSuccess,
    responseData,
  };
}
