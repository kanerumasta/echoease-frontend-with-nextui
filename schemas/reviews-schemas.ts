import { z } from "zod";
import { UserSchema } from "./user-schemas";

// {
//     "links": {
//       "next": null,
//       "previous": null
//     },
//     "total_pages": 1,
//     "current_page": 1,
//     "has_next": false,
//     "has_previous": false,
//     "count": 2,
//     "results": [
//       {
//         "id": 17,
//         "rating": 5,
//         "feedback": "what a nice performance from this artist. \r\nBook her now yeheyy!",
//         "created_at": "2024-11-16T10:18:43.020888Z",
//         "booking": 77,
//         "client": 79
//       },
//       {
//         "id": 16,
//         "rating": 4,
//         "feedback": "100% legit recommended singer. wow!",
//         "created_at": "2024-11-16T10:14:52.743982Z",
//         "booking": 68,
//         "client": 79
//       }
//     ]
// }


export const FeedbacksInSchema = z.object({
    id:z.number(),
    rating: z.number(),
    feedback: z.string(),
    created_at: z.date(),
    booking: z.number(),
    client: UserSchema,
})

export const PaginatedFeedbacksSchema = z.object({
    links: z.object({
        next: z.string().nullable(),
        previous: z.string().nullable(),
    }),
    total_pages: z.number(),
    current_page: z.number(),
    has_next: z.boolean(),
    has_previous: z.boolean(),
    count: z.number(),
    results: z.array(FeedbacksInSchema),
})
