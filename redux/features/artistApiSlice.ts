import { z } from "zod";
import { apiSlice } from "../services/apiSlice";
import {
  AcceptedIDsSchema,
  ArtistInSchema,
  ConnectionRequestSchema,
  CreateSpecialTimeSlotSchema,
  GenreSchema,
  InPortfolioSchema,
  MyConnectionsSchema,
  RateSchema,
  TimeslotSchema,
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
      query: () => "/artists?current=True",
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
    }),
    connectArtist: builder.mutation<any,any>({
        query: (data) => ({
            method: 'POST',
            url: '/artists/connection-requests',
            body: data
        })
    }),
    fetchConnectionRequests : builder.query<z.infer<typeof ConnectionRequestSchema>[],void>({
        query:()=>'/artists/connection-requests'
    }),
    fetchMyConnections :builder.query<z.infer<typeof MyConnectionsSchema>,void>({
        query:()=>'/artists/connections'
    }),
    fetchReceivedConnectionRequests:builder.query<z.infer<typeof ConnectionRequestSchema>[], void>({
        query:()=>'/artists/connection-requests/received'
    }),
    fetchSentConnectionRequests:builder.query<z.infer<typeof ArtistInSchema>[], void>({
        query:()=>'/artists/connection-requests/received'
    }),
    fetchArtistUnavailableDates:builder.query<string[],string>({
        query:(artistId)=>`/artists/${artistId}/unavailable-dates`
    }),
    fetchTimeSlots:builder.query<z.infer<typeof TimeslotSchema>[], {artistId:string, date:string}>({
        query:({artistId, date})=>`/artists/time-slots/${artistId}?date=${date}`,
        providesTags: (result, error, { artistId, date }) =>
            result ? [{ type: 'TimeSlots', date }] : [],
    }),
    fetchAllTimeSlots:builder.query<z.infer<typeof TimeslotSchema>[], string>({
        query:(artistId)=>`/artists/time-slots/${artistId}`
    }),
    createTimeSlotException:builder.mutation<any,{date:string,time_slot:number }>({
        query:(data) => ({
            url:'/artists/time-slot-exceptions',
            method:'POST',
            body:data

        }),
        invalidatesTags: (result, error, { date }) => [
            { type: 'TimeSlots', date },  // Invalidate this tag after mutation
          ],
    }),
    createSpecialTimeSlot:builder.mutation<any,z.infer<typeof CreateSpecialTimeSlotSchema>>({
        query:(data)=>({
            method:'POST',
            url:`/artists/special-time-slots`,
            body:data
        }),
        invalidatesTags: (result, error, { date }) => [
            { type: 'TimeSlots', date },  // Invalidate this tag after mutation
          ],
    })
  }),
});

export const {
    useFetchListArtistsQuery,
    useFetchDetailArtistBySlugQuery,
    useFetchGenresQuery,
    useFetchPortfolioQuery,
    useFetchArtistRatesQuery,
    useFetchDetailCurrentArtistQuery,
    useFetchAcceptedIdsQuery,
    useFetchConnectionRequestsQuery,
    useFetchMyConnectionsQuery,
    useFetchReceivedConnectionRequestsQuery,
    useFetchSentConnectionRequestsQuery,
    useFetchArtistUnavailableDatesQuery,
    useFetchTimeSlotsQuery,
    useFetchAllTimeSlotsQuery,


  useCreateArtistApplicationMutation,
  useFollowArtistMutation,
  useUnfollowArtistMutation,
  useCreateNewPortfolioMutation,
  useHasArtistApplicationQuery,
  useConnectArtistMutation,
  useCreateTimeSlotExceptionMutation,
  useCreateSpecialTimeSlotMutation,

} = artistApiSlice;
