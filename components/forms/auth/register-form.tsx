import { EyeFilledIcon } from "@/components/icons/eye";
import { EyeSlashFilledIcon } from "@/components/icons/eyeslash";
import { MailIcon } from "@/components/icons/mail";
import { useRegister } from "@/hooks/auth";
import { passwordSchema } from "@/schemas/auth-schemas";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import React, { useState } from "react";
import { Controller, FormProvider } from "react-hook-form";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import { Checkbox } from "@nextui-org/checkbox";

export default function RegisterForm() {
  const { form, onSubmit, isError, isLoading } = useRegister();
  const [isPasswordVisible, setPasswordIsVisible] = React.useState(false);
  const [isRePasswordVisible, setRePasswordIsVisible] = React.useState(false);
  const [isAgree, setIsAgree] = useState(false);
  return (
    <>
      <FormProvider {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
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
          <div className="flex space-x-2">
            <Controller
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <Input
                  radius="sm"
                  label="Firstname"
                  {...field}
                  variant="faded"
                  placeholder="E.g. Juan"
                  isInvalid={!!form.formState.errors.first_name}
                  errorMessage={form.formState.errors.first_name?.message}
                />
              )}
            />
            <Controller
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <Input
                  radius="sm"
                  label="Lastname"
                  {...field}
                  variant="faded"
                  placeholder="E.g. Dela Cruz"
                  isInvalid={!!form.formState.errors.last_name}
                  errorMessage={form.formState.errors.last_name?.message}
                />
              )}
            />
          </div>
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
                autoComplete="off"
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
                autoComplete="off"
                radius="sm"
                {...field}
                placeholder="Create a strong password"
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
          <Controller
            name="re_password"
            control={form.control}
            render={({ field }) => (
              <Input
                variant="faded"
                label="Confirm Password"
                radius="sm"
                {...field}
                placeholder="Confirm your password"
                type={isRePasswordVisible ? "text" : "password"}
                isInvalid={!!form.formState.errors.re_password}
                errorMessage={form.formState.errors.re_password?.message}
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
          <div className="flex items-start">
            <Checkbox isSelected={isAgree} onValueChange={setIsAgree} />
            <p className="text-sm">
              By creating an account, you agree to our{" "}
              <span className="text-blue-400 cursor-pointer hover:underline font-bold">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-blue-400 cursor-pointer hover:underline font-bold">
                Privacy Policy
              </span>
            </p>
          </div>
          <Button
            className="w-full"
            type="submit"
            color="primary"
            radius="sm"
            size="lg"
            isDisabled={isLoading || !isAgree}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                {" "}
                <Spinner size="sm" color="white" />
                Loading..
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        {/* <DevTool control={form.control} /> */}
      </FormProvider>
    </>
  );
}
