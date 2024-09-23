import { z } from "zod";

export const ClientDisputeSchema = z.object({
    client : z.string(),
    booking : z.string(),
    reason : z.string(),
    description : z.string()
})
export const ArtistDisputeSchema = z.object({
    artist : z.string(),
    booking : z.string(),
    reason : z.string(),
    description : z.string()
})