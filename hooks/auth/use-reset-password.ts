"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { useResetPasswordMutation } from "@/redux/features/authApiSlice";

const ResetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Please type your email here." })
    .min(1, "Please type your email here.")
    .email({ message: "Please enter a valid email." }),
});

export default function useResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = form.handleSubmit(
    (data: z.infer<typeof ResetPasswordSchema>) => {
      const validatedData = ResetPasswordSchema.safeParse(data);

      if (!validatedData.success) {
        toast.error("Email is not valid");

        return;
      }
      resetPassword(validatedData.data.email)
        .unwrap()
        .then(() => {
          toast.success("Please check your email to reset your password");
        })
        .catch(() => toast.error("Cant reset password as of now.."));
    },
  );

  return {
    form,
    isLoading,
    onSubmit,
  };
}
