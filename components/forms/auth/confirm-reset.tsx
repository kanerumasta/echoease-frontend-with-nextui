"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Controller, FormProvider } from "react-hook-form";

import { useConfirmPasswordReset } from "@/hooks/auth";
import { EyeSlashFilledIcon } from "@/components/icons/eyeslash";
import { EyeFilledIcon } from "@/components/icons/eye";

export default function ConfirmPasswordResetForm() {
  const { form, onSubmit, isLoading } = useConfirmPasswordReset();
  const [isPasswordVisible, setPasswordIsVisible] = useState(false);
  const [isRePasswordVisible, setRePasswordIsVisible] = useState(false);

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <Controller
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <Input
              errorMessage={form.formState.errors.new_password?.message}
              isInvalid={!!form.formState.errors.new_password}
              type={isPasswordVisible ? "text" : "password"}
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
              label="New Password"
            />
          )}
        />
        <Controller
          control={form.control}
          name="re_new_password"
          render={({ field }) => (
            <Input
              errorMessage={form.formState.errors.re_new_password?.message}
              isInvalid={!!form.formState.errors.re_new_password}
              type={isRePasswordVisible ? "text" : "password"}
              variant="faded"
              {...field}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setRePasswordIsVisible(!isRePasswordVisible)}
                >
                  {isRePasswordVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Confirm New Password"
            />
          )}
        />
        <Button color="primary" radius="sm" type="submit">
          Submit New Password
        </Button>
      </form>
      {/* <DevTool control={form.control}/> */}
    </FormProvider>
  );
}
