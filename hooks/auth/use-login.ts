import { useLoginUserMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, useToast } from "react-toastify";

import { z } from "zod";

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

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    const validatedData = LoginSchema.safeParse(data);
    if (!validatedData.success) {
      toast.error("Invalid Data Passed");
      return;
    }
    loginUser(validatedData.data).unwrap().then().catch();
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
