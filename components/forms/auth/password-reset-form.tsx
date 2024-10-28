"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FormProvider } from "react-hook-form";

import { useResetPassword } from "@/hooks/auth";
import { MailIcon } from "@/components/icons/mail";

export default function PasswordResetForm() {
  const { form, onSubmit, isLoading } = useResetPassword();

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          label="Email"
          {...form.register("email")}
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          errorMessage={form.formState.errors.email?.message}
          isInvalid={!!form.formState.errors.email}
          labelPlacement="outside"
          radius="sm"
          type="email"
          variant="faded"
        />
        <Button color="primary" isLoading={isLoading} radius="sm" type="submit">
          Submit
        </Button>
      </form>
      {/* <DevTool control={form.control} /> */}
    </FormProvider>
  );
}
