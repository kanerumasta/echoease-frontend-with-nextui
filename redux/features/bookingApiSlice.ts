import { BookInSchema } from "@/schemas/booking-schemas";
import { apiSlice } from "../services/apiSlice";
import { z } from "zod";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { UserSchema } from "@/schemas/user-schemas";
// {
//   "id": 4,
//   "event_date": "2024-09-27",
//   "event_name": "Wedding",
//   "event_time": "16:23:00",
//   "duration_in_hours": null,
//   "duration_in_minutes": null,
//   "event_location": "san miguel, lucas, bohol",
//   "created_at": "2024-09-18",
//   "updated_at": "2024-09-18",
//   "status": "pending",
//   "artist": 2,
//   "client": 5
// }

const DetailBookingInSchema = z.object({
  id: z.number(),
  event_date: z.string(),
  event_name: z.string(),
  event_time: z.string(),
  event_location: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.string(),
  artist: ArtistInSchema,
  client: UserSchema,
});

const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewBooking: builder.mutation<z.infer<typeof DetailBookingInSchema>, any>({
      query: (data) => ({
        method: "POST",
        url: "/bookings/",
        body: data,
      }),
    }),
    fetchMyBookings: builder.query<z.infer<typeof BookInSchema>[], void>({
      query: () => "/bookings",
    }),
    fetchBookingDetail: builder.query<z.infer<typeof BookInSchema>, string>({
      query: (id) => `/bookings/${id}`,
    }),
  }),
});

export const {
  useCreateNewBookingMutation,
  useFetchMyBookingsQuery,
  useFetchBookingDetailQuery,
} = bookingApiSlice;
