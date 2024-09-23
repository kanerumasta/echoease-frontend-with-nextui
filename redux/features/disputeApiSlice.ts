import { apiSlice } from "../services/apiSlice";

const disputeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArtistDispute: builder.mutation<unknown, any>({
      query: (data) => ({
        method: "POST",
        url: "/disputes/artist-disputes/",
        body: data,
      }),
    }),
    createClientDispute: builder.mutation<unknown, any>({
      query: (data) => ({
        method: "POST",
        url: "/disputes/client-disputes/",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateArtistDisputeMutation,
  useCreateClientDisputeMutation,
} = disputeApiSlice;
