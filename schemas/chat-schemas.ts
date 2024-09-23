import { z } from "zod";
import { UserSchema } from "./user-schemas";

export const ChatSchema = z.object({
    code: z.string(),
    participants: z.array(UserSchema),
  });
  
  export const MessageSchema = z.object({
    id: z.string(),
    author: z.string().email(),
    content: z.string(),
    date: z.string(),
    time: z.string(),
  });
  