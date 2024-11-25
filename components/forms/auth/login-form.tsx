"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect } from "react";
import { Controller, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useLogin } from "@/hooks/auth";
import { MailIcon } from "@/components/icons/mail";
import { EyeSlashFilledIcon } from "@/components/icons/eyeslash";
import { EyeFilledIcon } from "@/components/icons/eye";

const LoginSchema = z.object({
  email: z
    .string({ message: "Email is a required field" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ message: "Password is a required field" })
    .min(1, "Please enter password."),
});

export default function LoginForm({ redirect }: { redirect: string }) {
  const { form, onSubmit, isLoading, isError, error, isSuccess } = useLogin();
  const router = useRouter();

  const [isPasswordVisible, setPasswordIsVisible] = React.useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully.");
      router.replace("/");
    }
    if (isError) {
      toast.error("Email or password is incorrect.");
    }
  }, [isSuccess, isError]);

  return (
    <FormProvider {...form}>
      <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <input
          autoComplete="username"
          name="fake_email"
          style={{ display: "none" }}
          type="email"
        />
        <input
          autoComplete="new-password"
          name="fake_password"
          style={{ display: "none" }}
          type="password"
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input
                maxLength={250}
              label="Email"
              radius="sm"
              type="email"
              {...field}
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              errorMessage={form.formState.errors.email?.message}
              isInvalid={!!form.formState.errors.email}
              placeholder="example@gmail.com"
              variant="faded"
            />
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              label="Password"
              radius="sm"
              variant="faded"
              {...field}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setPasswordIsVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              errorMessage={form.formState.errors.password?.message}
              isInvalid={!!form.formState.errors.password}
              placeholder="Enter your password"
              type={isPasswordVisible ? "text" : "password"}
            />
          )}
        />
        <small
          className="text-black/50 dark:text-white/50 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
          onClick={() => router.push("/password-reset")}
        >
          Forgot password?
        </small>
        <Button
          className="w-full"
          color="primary"
          isDisabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              {" "}
              <Spinner color="white" size="sm" />
              Loading..
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
