import { useRegisterNewUserMutation } from "@/redux/features/authApiSlice";
import { passwordSchema } from "@/schemas/auth-schemas";
import { checkEmailExists } from "@/utils/check-email-exists";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
const commonPasswords = [
    'password', '123456', '123456789', '12345678', '12345',
    '1234567', 'qwerty', 'abc123', 'football', 'monkey',
    'letmein', 'iloveyou', 'admin', 'welcome', '123123',
    '1q2w3e4r', 'sunshine', 'qwertyuiop', '123321', 'password1',
];

const SignupSchema = z
  .object({
    first_name: z
      .string({ required_error: "Please provide firstname" })
      .min(1, "Please provide firstname")
    .regex(/^[A-Za-z\s]+$/, "First name must be letters only.").transform((val) => val.trim()),
    last_name: z
      .string({ required_error: "Please provide your lastname" })
      .min(1, "Please provide lastname")
      .regex(/^[A-Za-z\s]*$/, "Last name must be letters only").transform((val) => val.trim()),
    email: z.string().email({ message: "Please enter a valid email." }) .transform((val) => val.trim()),
    password: passwordSchema,
    re_password: z
      .string()
      .min(1, { message: "Password confirmation is required." }), // Make sure this is required
  }).refine((values) => values.password === values.re_password, {
    message: "Passwords should match.",
    path: ["re_password"], // Points to re_password for the error message
  }).refine((data) => {
    const { first_name, last_name, password } = data;
    return (
      first_name &&
      last_name &&
      !(
        password.toLowerCase().includes(first_name.toLowerCase()) ||
        password.toLowerCase().includes(last_name.toLowerCase())
      )
    );
  }, {
      message: 'Avoid putting personal information in your password.',
      path:['password']
  }).refine((data) => data.password && !commonPasswords.includes(data.password.toLowerCase()),
      { message: 'Password is too common. Please try another one.',path:['password'] })

export default function useRegister() {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });

  const [registerNewUser, { isLoading, isSuccess, isError, error }] =
    useRegisterNewUserMutation();

  const onSubmit: SubmitHandler<z.infer<typeof SignupSchema>> = async(
    data: z.infer<typeof SignupSchema>
  ) => {

      const emailExists = await checkEmailExists(data.email)

      if (emailExists) {
          toast.error('This email already exists.')
          return
      }




    registerNewUser(data)
      .unwrap()
      .then(() => {
        sessionStorage.setItem('email', data.email)
        window.location.href = "/auth/check-email";

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
