import { apiSlice } from "../services/apiSlice";

type TCreateOrder = {
  amount: number;
  booking: number;
  return_url: string;
  cancel_url: string;
};

type TCreateOrderResponse = {
  success: string;
  msg: string;
  payer_action: string;
};

type TCapturePayment = {
  payment_id: string;
  payer_id: string;
};

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    capturePayment: builder.mutation<any, TCapturePayment>({
      query: (body) => ({
        method: "POST",
        url: "/paypal/capture-payment",
        body: body,
      }),
    }),
    createOrder: builder.mutation<TCreateOrderResponse, TCreateOrder>({
      query: (body) => ({
        method: "POST",
        url: "/paypal/create-order",
        body: body,
      }),
    }),
    createPaymongoPaymentLink : builder.mutation<{checkout_link : string},{amount:string}>({
      query:(data)=>({
        method:'POST',
        url:"/paymongo/create-link",
        body:data
      })
    })
  }),
});

export const { useCapturePaymentMutation, useCreateOrderMutation, useCreatePaymongoPaymentLinkMutation } =
  paymentApiSlice;
