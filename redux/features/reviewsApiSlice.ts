import { z } from "zod";

import { PaginatedFeedbacksSchema } from "@/schemas/reviews-schemas";

import { apiSlice } from "../services/apiSlice";

const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchArtistRating: builder.query<{ rating__avg: number }, number>({
      query: (artistId) => `/reviews/artist-reviews/${artistId}`,
    }),
    postAReview: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/reviews/",
        body: data,
      }),
      invalidatesTags: ["Bookings", "CompletedBookings"],
    }),
    fetchArtistFeedbacks: builder.query<
      z.infer<typeof PaginatedFeedbacksSchema>,
      { artistId: number; page: number }
    >({
      query: (data) => `/reviews/feedbacks/${data.artistId}?page=${data.page}`,
    }),
  }),
});

export const {
  useFetchArtistRatingQuery,
  usePostAReviewMutation,
  useFetchArtistFeedbacksQuery,
} = reviewsApiSlice;
