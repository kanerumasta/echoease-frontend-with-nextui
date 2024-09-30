import { z } from "zod";
import { apiSlice } from "../services/apiSlice";
import {
  AcceptedIDsSchema,
  ArtistInSchema,
  GenreSchema,
  InPortfolioSchema,
  RateSchema,
} from "@/schemas/artist-schemas";

const artistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //POST
    createArtistApplication: builder.mutation<{ id: number }, any>({
      query: (data: any) => ({
        method: "POST",
        url: "/artists/applications/",

        body: data,
      }),
    }),

    // FETCH
    fetchListArtists: builder.query<z.infer<typeof ArtistInSchema>[], void>({
      query: () => "/artists",
    }),
    fetchDetailCurrentArtist: builder.query<
      z.infer<typeof ArtistInSchema>,
      void
    >({
      query: () => "/artists/?current=True",
    }),
    fetchDetailArtistBySlug: builder.query<
      z.infer<typeof ArtistInSchema>,
      string
    >({
      query: (slug: string) => `/artists/slug/${slug}`,
    }),
    fetchGenres: builder.query<z.infer<typeof GenreSchema>[], void>({
      query: () => "/artists/genres/",
    }),
    fetchAcceptedIds: builder.query<z.infer<typeof AcceptedIDsSchema>[], void>({
      query: () => "/artists/accepted-ids",
    }),
    followArtist: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "/artists/follow",
        body: data,
      }),
    }),
    unfollowArtist: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "/artists/unfollow",
        body: data,
      }),
    }),
    createNewPortfolio: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "/artists/portfolio-item",
        body: data,
      }),
    }),
    fetchPortfolio: builder.query<z.infer<typeof InPortfolioSchema>, string>({
      query: (artistId) => `/artists/portfolio/${artistId}`,
    }),
    fetchArtistRates: builder.query<z.infer<typeof RateSchema>[], string>({
      query: (artistId) => `/artists/${artistId}/rates`,
    }),
    hasArtistApplication : builder.query<any, void>({
        query: () => '/artists/applications?check=True'
    })
  }),
});

export const {
  useCreateArtistApplicationMutation,
  useFetchListArtistsQuery,
  useFetchDetailArtistBySlugQuery,
  useFetchGenresQuery,
  useFetchDetailCurrentArtistQuery,
  useFetchAcceptedIdsQuery,
  useFollowArtistMutation,
  useUnfollowArtistMutation,
  useCreateNewPortfolioMutation,
  useFetchPortfolioQuery,
  useFetchArtistRatesQuery,
  useHasArtistApplicationQuery
} = artistApiSlice;
