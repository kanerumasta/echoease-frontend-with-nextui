import { z } from "zod";
import { UserSchema } from "./user-schemas";

export const GenreOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const GenreSchema = z.object({
  id: z.number().min(1),
  name: z.string(),
});
export const AcceptedIDsSchema = z.object({
  id: z.number().min(1),
  name: z.string(),
});

export const ArtistApplicationSchema = z.object({
  idType: z.string(),
  frontId: z.instanceof(File),
  backId: z.instanceof(File).optional(),
  sampleVideos: z
    .array(z.instanceof(File), {
      required_error: "At least 2 videos are required.",
    })
    .min(2, "Add at least 2 videos.")
    .max(3, "You can only upload up to 3 videos."),

  genres: z.array(z.string()).min(1, "Pick at least 1 genre."),
  idol: z.string().nullable().optional(),

  yearsExperience: z.number().nullable().optional(),
  youtube: z.string().nullable().optional(),
  spotify: z.string().nullable().optional(),
  instagram: z.string().optional().nullable(),
  twitter: z.string().nullable().optional(),
  fb_link: z.string().nullable().optional(),
  bio: z.string(),
  rates: z.array(
    z.object({
      artist_application: z.string().nullable().optional(),
      name: z.string(),
      amount: z.string(),
    })
  ),
});

export const ArtistInSchema = z.object({
  id: z.number(),
  bio: z.string().nullable(),
  user: UserSchema,
  slug: z.string().nullable(),
  fb_link: z.string().nullable(),
  instagram: z.string().nullable(),
  twitter: z.string().nullable(),
  status: z.string().nullable(),
  date_approved: z.string().nullable(),
  time_approved: z.string().nullable(),
  spotify: z.string().nullable(),
  youtube: z.string().nullable(),
  idol: z.string().nullable(),
  years_experience: z.number().nullable(),
  award_image1: z.string().nullable(),
  award_image2: z.string().nullable(),
  award_image3: z.string().nullable(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).nullable(),
  followers: z.array(z.number()),
  portfolio: z.number(),
});

export const CreatePortfolioItemSchema = z
  .object({
    portfolio: z.string(),
    title: z.string().min(1, { message: "A portfolio needs a title." }),
    description: z.string(),
    group: z.string().optional().nullable(),
    videos: z
      .array(z.instanceof(File))
      .max(2, { message: "You can only upload two videos." })
      .nullable()
      .optional(),
    images: z
      .array(z.instanceof(File))
      .max(5, { message: "You can only upload upto 5 images." })
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.images && !data.videos) {
        console.log("here");
        return false;
      }
      return true;
      console.log("here1");
    },
    { message: "Attach at least an image or a video.", path: ["images"] }
  );

export const InPortfolioItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  group: z.string(),
  portfolio: z.number(),
  videos: z.array(z.string()),
  images: z.array(z.string()),
});

export const InPortfolioSchema = z.object({
  id: z.number(),
  items: z.array(InPortfolioItemSchema),
  artist: z.number(),
});

export const RateSchema = z.object({
  id: z.number(),
  amount: z.number(),
  name: z.string(),
  artist_application: z.number(),
  artist: z.number(),
});
// {
//   "amount": 5000,
//   "name": "1-3 songs",
//   "artist_application": 5,
//   "artist": 3
// }




// {
//   "id": 16,
//   "genres": [
//     1,
//     2
//   ],
//   "bio": null,
//   "sample_video1": null,
//   "sample_video2": null,
//   "sample_video3": null,
//   "fb_link": "fb.com",
//   "instagram": "instag.com",
//   "twitter": "twitte.com",
//   "created": "2024-09-23T09:35:07.730518Z",
//   "updated": "2024-09-23T09:35:07.730518Z",
//   "status": "under_review",
//   "idol": "jordan",
//   "years_experience": null,
//   "spotify": null,
//   "youtube": null,
//   "award_image1": null,
//   "award_image2": null,
//   "award_image3": null,
//   "front_id": null,
//   "back_id": null,
//   "user": 8,
//   "id_type": null
// }