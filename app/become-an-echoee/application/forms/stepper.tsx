"use client";

import { Button } from "@nextui-org/button";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { ArtistApplicationSchema } from "@/schemas/artist-schemas";

//Form Stepper

type Props = {
  className?: string;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  steps: any;
  submit: () => void;
  isSubmitting: boolean;
};

export default function Stepper({
  className = "",
  currentStep,
  setCurrentStep,
  steps,
  submit,
  isSubmitting,
}: Props) {
  const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();

  type FieldName = keyof z.infer<typeof ArtistApplicationSchema>;
  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const isValid = await form.trigger(fields as FieldName[]);

    if (!isValid) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className={className}>
      <Button
        isDisabled={!(currentStep > 0)}
        radius="sm"
        size="lg"
        type="button"
        onClick={() => setCurrentStep((prev) => prev - 1)}
      >
        Back
      </Button>

      {currentStep < steps.length - 1 ? (
        <Button
          color="primary"
          radius="sm"
          size="lg"
          type="button"
          onClick={handleNext}
        >
          Next
        </Button>
      ) : (
        <Button
          color="primary"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          radius="sm"
          size="lg"
          onClick={submit}
        >
          Submit
        </Button>
      )}
    </div>
  );
}
