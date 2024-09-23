import { z } from "zod";
import { ArtistInSchema } from "./artist-schemas";
import { UserSchema } from "./user-schemas";

export const BookingSchema = z.object({
  eventName: z.string().min(1, "Event name is required."),
  eventDate: z.string().min(1),
  eventTime: z.string().min(1, "Event time is required."),
  province: z.string().min(1, "Event location is required."),
  municipality: z.string().min(1, "Event location is required."),
  barangay: z.string().min(1, "Event location is required."),
  street: z.string().min(1, "Event location is required."),
  landmark: z.string().min(1, "Event location is required."),
  artist: z.string().optional().nullable(),
  rate: z.string().min(1, "Rate is required."),
  rateName: z.string(),
  rateAmount: z.string(),
});

export const BookInSchema = z.object({
  id: z.number(),
  event_date: z.string(),
  is_completed: z.boolean(),
  formatted_event_date: z.string(),
  formatted_event_time: z.string(),
  event_name: z.string(),
  event_time: z.string(),
  duration_in_hours: z.number().nullable(),
  duration_in_minutes: z.number().nullable(),
  event_location: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.string(),
  artist: ArtistInSchema,
  client: UserSchema,
});
