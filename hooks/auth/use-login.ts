import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { useLoginUserMutation } from "@/redux/features/authApiSlice";

const LoginSchema = z.object({
  email: z
    .string({ message: "Please type your email here." })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ message: "Please type your password here." })
    .min(1, "Please type your password here."),
});

export default function useLogin() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const [loginUser, { isLoading, isSuccess, isError, error, status }] =
    useLoginUserMutation();

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const validatedData = LoginSchema.safeParse(data);

    if (!validatedData.success) {
      toast.error("Invalid Data Passed");

      return;
    }
    await loginUser(validatedData.data).unwrap();
    form.reset();
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return {
    form,
    onSubmit,

    isLoading,
    isSuccess,
    isError,
    error,
  };
}
