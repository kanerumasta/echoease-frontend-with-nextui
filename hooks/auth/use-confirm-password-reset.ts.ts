"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { passwordSchema } from "@/schemas/auth-schemas";
import { useResetPasswordConfirmMutation } from "@/redux/features/authApiSlice";

const ResetPasswordSchema = z
  .object({
    new_password: passwordSchema,
    re_new_password: z.string({
      message: "Password confirmation is required.",
    }),
  })
  .refine(
    (values) => {
      return values.new_password === values.re_new_password;
    },
    { message: "Passwords do not match", path: ["re_new_password"] },
  );

export default function useConfirmPasswordReset() {
  const params = useParams<{ uid: string; token: string }>();
  const [resetPasswordConfirm, { isLoading }] =
    useResetPasswordConfirmMutation();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(
    (data: z.infer<typeof ResetPasswordSchema>) => {
      const validatedData = ResetPasswordSchema.safeParse(data);
      const token = params.token;
      const uid = params.uid;

      if (validatedData.success) {
        const new_password = validatedData.data.new_password;
        const re_new_password = validatedData.data.re_new_password;

        resetPasswordConfirm({ new_password, re_new_password, uid, token })
          .unwrap()
          .then(() => {
            toast.success("Your password is changed");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
          })
          .finally(() => {
            router.replace("/auth/login");
          });
      } else {
        toast.error("Invalid Data");
      }
    },
  );

  return {
    form,
    isLoading,
    onSubmit,
  };
}
