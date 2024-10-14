import { z } from "zod";
import { apiSlice } from "../services/apiSlice";
import {
  AcceptedIDsSchema,
  ArtistInSchema,
  ConnectionRequestSchema,
  GenreSchema,
  InPortfolioSchema,
  MyConnectionsSchema,
  RateSchema,
  RecommendedArtistsConnectionsSchema,
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
      providesTags:['CurrentArtist']
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
    updateArtist:builder.mutation<any, any>({
        query:(data) => ({
            url:'/artists/',
            method:'PATCH',
            body:data
        }),
        invalidatesTags:['CurrentArtist']
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
    createNewPortfolioItem: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "/artists/portfolio-item",
        body: data,
      }),
      invalidatesTags:['Portfolio']
    }),
    addNewPortfolioItemMedia: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "/artists/portfolio-item-media",
        body: data,
      }),
      invalidatesTags:['Portfolio']
    }),
    fetchPortfolio: builder.query<z.infer<typeof InPortfolioSchema>, string>({
      query: (artistId) => `/artists/portfolio/${artistId}`,
      providesTags:['Portfolio']
    }),
    deletePortofolioItem:builder.mutation<any,string>({
        query:(id)=>({
            url:`/artists/portfolio-item/${id}`,
            method:'DELETE'
        }),
        invalidatesTags:['Portfolio']
    }),
    deletePortofolioItemMedia:builder.mutation<any,string>({
        query:(id)=>({
            url:`/artists/portfolio-item-media/${id}`,
            method:'DELETE'
        }),
        invalidatesTags:['Portfolio']
    }),

    fetchArtistRates: builder.query<z.infer<typeof RateSchema>[], string>({
      query: (artistId) => `/artists/${artistId}/rates`,
    }),
    addArtistRates: builder.mutation<any, any>({
      query: (data) => ({
        url:'/artists/rates',
        method:'POST',
        body:data
      }),
      invalidatesTags:['CurrentArtist']
    }),
    editArtistRate: builder.mutation<any, any>({
      query: (data) => ({
        url:'/artists/rates',
        method:'PATCH',
        body:data
      }),
      invalidatesTags:['CurrentArtist']
    }),
    deleteArtistRate: builder.mutation<any, string>({
      query: (id) => ({
        url:`/artists/rates/${id}`,
        method:'DELETE',
      }),
      invalidatesTags:['CurrentArtist']
    }),
    deleteGenre: builder.mutation<any, string>({
      query: (id) => ({
        url:`/artists/genres/${id}/delete`,
        method:'DELETE',
      }),
      invalidatesTags:['CurrentArtist']
    }),
    addGenre: builder.mutation<any, string>({
      query: (id) => ({
        url:`/artists/genres/${id}/add`,
        method:'POST',
      }),
      invalidatesTags:['CurrentArtist']
    }),
    hasArtistApplication : builder.query<any, void>({
        query: () => '/artists/applications?check=True'
    }),
    connectArtist: builder.mutation<any,any>({
        query: (data) => ({
            method: 'POST',
            url: '/artists/connection-requests',
            body: data
        }),
        invalidatesTags:["SentConnectionRequests","RecommendedArtists"]
    }),
    fetchConnectionRequests : builder.query<z.infer<typeof ConnectionRequestSchema>[],void>({
        query:()=>'/artists/connection-requests?status=pending'
    }),
    fetchMyConnections :builder.query<z.infer<typeof MyConnectionsSchema>,void>({
        query:()=>'/artists/connections',
        providesTags:['Connections']
    }),
    fetchReceivedConnectionRequests:builder.query<z.infer<typeof ConnectionRequestSchema>[], void>({
        query:()=>'/artists/connection-requests/received?status=pending',
        providesTags:["ConnectionRequests"]
    }),
    fetchSentConnectionRequests:builder.query<z.infer<typeof ConnectionRequestSchema>[], void>({
        query:()=>'/artists/connection-requests/sent?status=pending',
        providesTags:['SentConnectionRequests']
    }),
    deleteConnectionRequest:builder.mutation<any, string>({
        query:(id)=>({
            url:`/artists/connection-requests/${id}`,
            method:'DELETE'
        }),
        invalidatesTags:['SentConnectionRequests', 'RecommendedArtists']
    }),

    fetchRecommendedArtistConnections : builder.query<z.infer<typeof RecommendedArtistsConnectionsSchema
    >[],void>({
        query: () => '/artists/get-recommended-artists',
        providesTags:['RecommendedArtists']
    }),
    acceptConnectionRequest:builder.mutation<any, string>({
        query:(id) => ({
            url:'/artists/connection-requests',
            method:'PATCH',
            body:{
                request_id:id,
                action:'accept'
            }
        }),
        invalidatesTags:['Connections', 'ConnectionRequests','RecommendedArtists']
    }),
    declineConnectionRequest:builder.mutation<any, string>({
        query:(id) => ({
            url:'/artists/connection-requests',
            method:'PATCH',
            body:{
                request_id:id,
                action:'reject'
            }
        }),
        invalidatesTags:['ConnectionRequests']
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
    useFetchRecommendedArtistConnectionsQuery,

  useCreateArtistApplicationMutation,
  useFollowArtistMutation,
  useUnfollowArtistMutation,
  useCreateNewPortfolioItemMutation,
  useHasArtistApplicationQuery,
  useConnectArtistMutation,
    useAddNewPortfolioItemMediaMutation,
    useDeletePortofolioItemMutation,
    useDeletePortofolioItemMediaMutation,
    useAcceptConnectionRequestMutation,
    useDeclineConnectionRequestMutation,
    useDeleteConnectionRequestMutation,
    useAddArtistRatesMutation,
    useEditArtistRateMutation,
    useDeleteArtistRateMutation,
    useDeleteGenreMutation,
    useAddGenreMutation,
    useUpdateArtistMutation

} = artistApiSlice;
