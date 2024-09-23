"use client";
import { EyeFilledIcon } from "@/components/icons/eye";
import { EyeSlashFilledIcon } from "@/components/icons/eyeslash";
import { useConfirmPasswordReset } from "@/hooks/auth";
import { DevTool } from "@hookform/devtools";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Controller, FormProvider } from "react-hook-form";

export default function ConfirmPasswordResetForm() {
  const { form, onSubmit, isLoading } = useConfirmPasswordReset();
  const [isPasswordVisible, setPasswordIsVisible] = useState(false);
  const [isRePasswordVisible, setRePasswordIsVisible] = useState(false);

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <Controller
          name="new_password"
          control={form.control}
          render={({ field }) => (
            <Input
              type={isPasswordVisible ? "text" : "password"}
              variant="faded"
              isInvalid={!!form.formState.errors.new_password}
              errorMessage={form.formState.errors.new_password?.message}
              {...field}
              label="New Password"
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
        <Controller
          name="re_new_password"
          control={form.control}
          render={({ field }) => (
            <Input
              type={isRePasswordVisible ? "text" : "password"}
              variant="faded"
              isInvalid={!!form.formState.errors.re_new_password}
              errorMessage={form.formState.errors.re_new_password?.message}
              {...field}
              label="Confirm New Password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setRePasswordIsVisible(!isRePasswordVisible)}
                  aria-label="toggle password visibility"
                >
                  {isRePasswordVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          )}
        />
        <Button type="submit" color="primary" radius="sm">
          Submit New Password
        </Button>
      </form>
      {/* <DevTool control={form.control}/> */}
    </FormProvider>
  );
}
