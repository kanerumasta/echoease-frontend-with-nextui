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

  //idtypeinstring is just a helper to set the id type in string to be used by the picker.
  idTypeInString: z.string().nullable().optional(),

  frontId: z.instanceof(File),
  backId: z.instanceof(File),
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
  ).min(1, 'You must add at least one artist rate.'),
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
  connections : z.array(z.number())
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
//     "id": 5,
//     "timestamp": "2024-10-01T03:28:15.247875Z",
//     "status": "pending",
//     "sender": 8,
//     "receiver": 7
//   }
export const ConnectionRequestSchema = z.object({
id:z.number(),
timestamp:z.string(),
status : z.string(),
sender : ArtistInSchema,
receiver : ArtistInSchema
})

export const MyConnectionsSchema = z.object({
    connections : z.array(ArtistInSchema)
})
