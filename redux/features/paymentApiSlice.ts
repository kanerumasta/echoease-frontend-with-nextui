import { apiSlice } from "../services/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createDownPaymentIntent: builder.mutation<{ payment_intent_id:string},any>({
            query: (data) => ({
                url: '/payments/create-downpayment-intent',
                method: 'POST',
                body:data
            })
        }),
        attachDownPaymentIntent: builder.mutation({
            query: (data) => ({
                url: '/payments/attach-downpayment-intent',
                method: 'POST',
                body:data
            })
        }),
        finalizeDownPayment: builder.mutation({
            query: (data) => ({
                url: '/payments/retrieve-downpayment-intent',
                method: 'POST',
                body:data
            })
        }),

    }),
})

export const {
    useCreateDownPaymentIntentMutation,
    useAttachDownPaymentIntentMutation,
    useFinalizeDownPaymentMutation
} = paymentApiSlice
