"use client";

import { z } from "zod";

import { useCreateArtistDisputeMutation } from "@/redux/features/disputeApiSlice";
import { ArtistDisputeSchema } from "@/schemas/dispute-schemas";

export default function useCreateArtistDispute() {
  const [createArtistDispute, { isLoading, isError, isSuccess }] =
    useCreateArtistDisputeMutation();
  const onSubmit = (data: z.infer<typeof ArtistDisputeSchema>) => {
    const validatedData = ArtistDisputeSchema.safeParse(data);

    if (validatedData.success) {
      createArtistDispute(data).unwrap().then().catch();
    } else {
      console.log(
        "ERROR: data is not valid - validated by safeParse in Hooks submit",
      );
    }
  };

  return {
    onSubmit,
    isLoading,
    isError,
    isSuccess,
  };
}
