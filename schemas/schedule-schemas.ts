import { z } from "zod";

export const UnavailableDateSchema = z.object({

    id: z.number(),
    date: z.string(),
    artist:z.number()
})
