import { z } from "zod";
import { apiSlice } from "../services/apiSlice";
import { InSpecialTimeSlotsSchema, InTimeslotSchema, SpecialTimeSlotsSchema } from "@/schemas/artist-schemas";
import { UnavailableDateSchema } from "@/schemas/schedule-schemas";

const scheduleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({


        //WILL GET (date) as DATA
        createUnavailableDate: builder.mutation<any,any >({
            query: (data) => ({
                url: `/artists/unavailable-dates`,
                method: 'POST',
                body:data
            }),
            invalidatesTags:['MyUnavailableDates']
        }),
        deleteUnavailableDate: builder.mutation<any,number >({
            query: (id) => ({
                url: `/artists/unavailable-dates/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags:['MyUnavailableDates']
        }),

        //FETCHES
        fetchArtistUnavailableDates: builder.query<z.infer<typeof UnavailableDateSchema>[],number>({
            query:(artist) => `/artists/${artist}/unavailable-dates`
        }),
        fetchMyUnavailableDatesQuery: builder.query<z.infer<typeof UnavailableDateSchema>[],void>({
            query: (artist) => `/artists/unavailable-dates`,
            providesTags:['MyUnavailableDates']
        }),
    })
})



export const {
    useDeleteUnavailableDateMutation,
    useCreateUnavailableDateMutation,


    //FETCHES
    useFetchArtistUnavailableDatesQuery,
    useFetchMyUnavailableDatesQueryQuery, //FOR ARTIST


} = scheduleApiSlice
