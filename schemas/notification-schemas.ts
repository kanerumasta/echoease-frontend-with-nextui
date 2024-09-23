import { z } from "zod";
import { BookInSchema } from "./booking-schemas";
import { MessageSchema } from "./chat-schemas";
import { UserSchema } from "./user-schemas";

export const NotificationInSchema = z.object({
  id: z.number(),
  notification_type: z.string(),
  title: z.string(),
  description: z.string(),
  is_read: z.boolean(),
  create_at: z.string(),
  user: UserSchema.nullable(),
  booking: BookInSchema.nullable(),
  message: MessageSchema.nullable(),
  follower: UserSchema.nullable(),
});
