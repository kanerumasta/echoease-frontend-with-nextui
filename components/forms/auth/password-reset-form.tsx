"use client";
import { MailIcon } from "@/components/icons/mail";
import { useResetPassword } from "@/hooks/auth";
import { DevTool } from "@hookform/devtools";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FormProvider } from "react-hook-form";

export default function PasswordResetForm() {
  const { form, onSubmit, isLoading } = useResetPassword();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email"
          {...form.register("email")}
          type="email"
          variant="faded"
          radius="sm"
          isInvalid={!!form.formState.errors.email}
          errorMessage={form.formState.errors.email?.message}
          labelPlacement="outside"
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Button isLoading={isLoading} radius="sm" color="primary" type="submit">
          Submit
        </Button>
      </form>
      {/* <DevTool control={form.control} /> */}
    </FormProvider>
  );
}
