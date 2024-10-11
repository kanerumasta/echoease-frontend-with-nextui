"use client";
import { EyeFilledIcon } from "@/components/icons/eye";
import { EyeSlashFilledIcon } from "@/components/icons/eyeslash";
import { MailIcon } from "@/components/icons/mail";
import { useLogin } from "@/hooks/auth";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect } from "react";
import SocialButtons from "./SocialButtons";
import {
  Controller,
  Form,
  FormProvider,
  useController,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@nextui-org/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

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
        router.replace('/')
    }
    if (isError) {
      toast.error("Email or password is incorrect.");
    }
  }, [isSuccess, isError]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <input
          type="email"
          name="fake_email"
          autoComplete="username"
          style={{ display: "none" }}
        />
        <input
          type="password"
          name="fake_password"
          autoComplete="new-password"
          style={{ display: "none" }}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <Input
              type="email"
              radius="sm"
              label="Email"
              {...field}
              variant="faded"
              placeholder="example@gmail.com"
              isInvalid={!!form.formState.errors.email}
              errorMessage={form.formState.errors.email?.message}
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <Input
              variant="faded"
              label="Password"
              radius="sm"
              {...field}
              placeholder="Enter your password"
              type={isPasswordVisible ? "text" : "password"}
              isInvalid={!!form.formState.errors.password}
              errorMessage={form.formState.errors.password?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setPasswordIsVisible(!isPasswordVisible)}
                  aria-label="toggle password visibility"
                >
                  {isPasswordVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          )}
        />
        <small
          onClick={() => router.push("/password-reset")}
          className="text-black/50 dark:text-white/50 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
        >
          Forgot password?
        </small>
        <Button
          className="w-full"
          type="submit"
          color="primary"
          isDisabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              {" "}
              <Spinner size="sm" color="white" />
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
