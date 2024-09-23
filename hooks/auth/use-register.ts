import { useRegisterNewUserMutation } from "@/redux/features/authApiSlice";
import { passwordSchema } from "@/schemas/auth-schemas";
import { checkEmailExists } from "@/utils/check-email-exists";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const SignupSchema = z
  .object({
    first_name: z
      .string({ required_error: "Please provide firstname" })
      .min(1, "Please provide firstname")
      .regex(/^[A-Za-z\s]+$/, "First name must be letters only."),
    last_name: z
      .string({ required_error: "Please provide your lastname" })
      .min(1, "Please provide lastname")
      .regex(/^[A-Za-z\s]*$/, "Last name must be letters only"),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: passwordSchema,
    re_password: z
      .string()
      .min(1, { message: "Password confirmation is required." }), // Make sure this is required
  })
  .refine((values) => values.password === values.re_password, {
    message: "Passwords should match.",
    path: ["re_password"], // Points to re_password for the error message
  })
  .refine(
    async (val) => {
      const emailExists = await checkEmailExists(val.email);
      return !emailExists;
    },
    {
      message: "Email already exists",
      path: ["email"],
    }
  );

export default function useRegister() {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });

  const [registerNewUser, { isLoading, isSuccess, isError, error }] =
    useRegisterNewUserMutation();

  const onSubmit: SubmitHandler<z.infer<typeof SignupSchema>> = (
    data: z.infer<typeof SignupSchema>
  ) => {
    // const validatedData = SignupSchema.safeParseAsync(data);
    // if (!validatedData.) {
    //   toast.error("Invalid Data Passed");
    //   return;
    // }
    registerNewUser(data)
      .unwrap()
      .then(() => {
        window.location.href = "/auth/check-email";
        // setTimeout(() => {
        //   window.location.replace("/auth/login");
        // }, 2000);
      })
      .catch();
  };

  return {
    form,
    isLoading,
    onSubmit,
    isSuccess,
    isError,
    error,
  };
}
