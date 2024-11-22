import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

import { FeedbacksInSchema } from "@/schemas/reviews-schemas";
import { useFetchArtistFeedbacksQuery } from "@/redux/features/reviewsApiSlice";
import { cn } from "@/lib/utils";

import { Ratings } from "./rating";

export const Reviews = ({ artistId }: { artistId: number }) => {
  const [page, setPage] = useState(1);
  const { data: feedbacks } = useFetchArtistFeedbacksQuery({
    artistId,
    page,
  });

  return (
    <div
      className={cn("m-8 lg:mx-20 flex flex-col md", {
        hidden: feedbacks?.results.length === 0,
      })}
    >
      <h1 className="text-center mb-4 text-2xl font-bold tracking-wider text-blue-400">
        Echo Feedbacks
      </h1>
      <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2">
        {feedbacks &&
          feedbacks.results.map((feedback) => (
            <ReviewItem key={feedback.id} feedback={feedback} />
          ))}
      </div>
    </div>
  );
};

const ReviewItem = ({
  feedback,
}: {
  feedback: z.infer<typeof FeedbacksInSchema>;
}) => {
  return (
    <div className="bg-white/10 flex flex-col gap-4 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Image
          alt={feedback.client.fullname}
          className="rounded-full ring-2 ring-blue-400"
          height={40}
          src={`${process.env.NEXT_PUBLIC_HOST}${feedback.client.profile?.profile_image}`}
          width={40}
        />
        <div className="flex flex-col gap-1">
          <p className="text-md font-bold tracking-wider">
            {feedback.client.fullname}
          </p>
          <div>
            <Ratings rating={feedback.rating} size={15} />
          </div>
        </div>
      </div>
      <p className="text-sm  text-white/70">{feedback.feedback}</p>
    </div>
  );
};
