'use client'

import { ArtistApplicationSchema } from "@/schemas/artist-schemas";
import { Button } from "@nextui-org/button";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

//Form Stepper

type Props = {
    className?: string;
    currentStep: number;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    steps: any;
    submit: () => void;
    isSubmitting: boolean;
}

export default function Stepper ({
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
          size="lg"
          radius="sm"
            isDisabled={!(currentStep > 0)}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            type="button"
          >
            Back
          </Button>


        {currentStep < steps.length - 1 ? (
          <Button radius="sm" size="lg" color="primary" onClick={handleNext} type="button">
            Next
          </Button>
        ) : (
          <Button
            radius="sm"
            size="lg"
            color="primary"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            onClick={submit}
          >
            Submit
          </Button>
        )}
      </div>
    );
  };
