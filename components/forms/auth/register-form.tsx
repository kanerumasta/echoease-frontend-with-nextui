import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import React, { useState } from "react";
import { Controller, FormProvider } from "react-hook-form";
import { Checkbox } from "@nextui-org/checkbox";

import { useRegister } from "@/hooks/auth";
import { MailIcon } from "@/components/icons/mail";
import { EyeSlashFilledIcon } from "@/components/icons/eyeslash";
import { EyeFilledIcon } from "@/components/icons/eye";

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
          className="space-y-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
          <div className="flex space-x-2">
            <Controller
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <Input
                  label="Firstname"
                  radius="sm"
                  {...field}
                  errorMessage={form.formState.errors.first_name?.message}
                  isInvalid={!!form.formState.errors.first_name}
                  placeholder="E.g. Juan"
                  variant="faded"
                />
              )}
            />
            <Controller
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <Input
                  label="Lastname"
                  radius="sm"
                  {...field}
                  errorMessage={form.formState.errors.last_name?.message}
                  isInvalid={!!form.formState.errors.last_name}
                  placeholder="E.g. Dela Cruz"
                  variant="faded"
                />
              )}
            />
          </div>
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                label="Email"
                radius="sm"
                type="email"
                {...field}
                autoComplete="off"
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
                autoComplete="off"
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
                placeholder="Create a strong password"
                type={isPasswordVisible ? "text" : "password"}
              />
            )}
          />
          <Controller
            control={form.control}
            name="re_password"
            render={({ field }) => (
              <Input
                label="Confirm Password"
                radius="sm"
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
                errorMessage={form.formState.errors.re_password?.message}
                isInvalid={!!form.formState.errors.re_password}
                placeholder="Confirm your password"
                type={isRePasswordVisible ? "text" : "password"}
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
            color="primary"
            isDisabled={isLoading || !isAgree}
            radius="sm"
            size="lg"
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                {" "}
                <Spinner color="white" size="sm" />
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
