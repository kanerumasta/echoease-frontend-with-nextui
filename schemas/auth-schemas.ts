import { z } from "zod";



export const passwordSchema = z
  .string({ message: "Password is required." })
  .min(8, "Password must be at leaste 8 characters long.")
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must include at least one uppercase letter",
  })
  .refine((value) => /[a-z]/.test(value), {
    message: "Password must include at least one lowercase letter",
  })
  .refine((value) => /\d/.test(value), {
    message: "Password must include at least one number",
  })
  .refine((value) => /[\W_]/.test(value), {
    message: "Password must include at least one special character",
  })
export const ResetPasswordConfirmSchema = z.object({
    uid: z.string(),
    token: z.string(),
    new_password: z.string(),
    re_new_password: z.string(),
  });
