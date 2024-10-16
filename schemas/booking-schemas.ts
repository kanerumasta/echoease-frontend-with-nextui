import { z } from "zod";
import { ArtistInSchema, RateSchema } from "./artist-schemas";
import { UserSchema } from "./user-schemas";
import { Time } from "@internationalized/date";

export const TimeSlotSchema = z.object({
    start_time : z.string(),
end_time : z.string(),
    is_booked:z.boolean()
})

export const BookingSchema = z
  .object({
    eventName: z.string().min(1, "Event name is required."),
    eventDate: z.date(),
    startTime: z.instanceof(Time),
    endTime: z.instanceof(Time),
    municipality: z.string().min(1, "Event location is required."),
    barangay: z.string().min(1, "Event location is required."),
    street: z.string().min(1, "Event location is required."),
    landmark: z.string().min(1, "Event location is required."),
    artist: z.string().optional().nullable(),
    rate: z.string(),
    rateName: z.string().optional().nullable(),
    rateAmount: z.string().optional().nullable(),
    time_slot:TimeSlotSchema.nullable(),
  })


export const BookInSchema = z.object({
  id: z.number(),
  event_date: z.string(),
  booking_reference:z.string(),
  is_completed: z.boolean(),
  formatted_event_date: z.string(),
  formatted_end_time: z.string(),
  formatted_start_time: z.string(),
  event_name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  duration_in_hours: z.number().nullable(),
  duration_in_minutes: z.number().nullable(),
  event_location: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.string(),
  artist: ArtistInSchema,
  client: UserSchema,
  downpayment_amount:z.number(),
  service_fee:z.number(),

rate: RateSchema,
    location: z.string(),
});


export const PaginatedBookInSchema = z.object({
    links:z.object({
        next:z.string().nullable(),
        previous:z.string().nullable()
    }),
    total_pages: z.number(),
    current_page: z.number(),
    has_next: z.boolean(),
    has_previous: z.boolean(),
    count: z.number(),
    results: z.array(BookInSchema)
})
