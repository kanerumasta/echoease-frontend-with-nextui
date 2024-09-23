"use client";

import { useCreateClientDisputeMutation } from "@/redux/features/disputeApiSlice";
import { ClientDisputeSchema } from "@/schemas/dispute-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export default function useCreateClientDispute() {
  const form = useForm<z.infer<typeof ClientDisputeSchema>>({
    resolver: zodResolver(ClientDisputeSchema),
  });
  const [createClientDispute, { isLoading, isError, isSuccess }] =
    useCreateClientDisputeMutation();
  const onSubmit = (data: z.infer<typeof ClientDisputeSchema>) => {
    const validatedData = ClientDisputeSchema.safeParse(data);
    if (validatedData.success) {
      createClientDispute(data)
        .unwrap()
        .then(() =>
          toast.success(
            "Dispute successfully created. Please wait for admin resolution."
          )
        )
        .catch();
    } else {
      console.log(
        "ERROR: data is not valid - validated by safeParse in Hooks submit"
      );
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    isError,
    isSuccess,
  };
}
