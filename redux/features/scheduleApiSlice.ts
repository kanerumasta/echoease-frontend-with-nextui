import { z } from "zod";
import { apiSlice } from "../services/apiSlice";
import { UnavailableDateSchema, WeekdayAvailabilitySchema } from "@/schemas/schedule-schemas";
import { TimeSlotSchema } from "@/schemas/booking-schemas";

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
        fetchArtistAvailabilities:builder.query<z.infer<typeof TimeSlotSchema>[],{artist:number, date:string}>({
            query:({artist, date})=>`/schedule/artist-time-slot/${artist}/${date}`
        }),
        fetchArtistWeekdaysAvailability:builder.query<number[],number>({
            query:(artist) => `/schedule/artist-weekdays/${artist}`
        })
    })
})



export const {
    useDeleteUnavailableDateMutation,
    useCreateUnavailableDateMutation,


    //FETCHES
    useFetchArtistUnavailableDatesQuery,
    useFetchMyUnavailableDatesQueryQuery, //FOR ARTIST
    useFetchArtistAvailabilitiesQuery,
    useFetchArtistWeekdaysAvailabilityQuery


} = scheduleApiSlice
