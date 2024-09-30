import { Button } from "@nextui-org/button";
import { Dispatch, Ref, RefObject, SetStateAction } from "react";

type Props = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  className: string;
  formRef: Ref<HTMLFormElement | null>;
  steps: string[];
  isSubmitting?: boolean;
};

export const FormStepper = ({
  className,
  currentStep,
  setCurrentStep,
  formRef,
  steps,
  isSubmitting,
}: Props) => {
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const triggersubmit = () => {
    if (formRef && (formRef as RefObject<HTMLFormElement>).current) {
      (formRef as RefObject<HTMLFormElement>).current?.requestSubmit();
    }
  };

  return (
    <div className={className}>
      <Button
        isDisabled={currentStep <= 0}
        onPress={handleBack}
        color="default"
        radius="sm"
      >
        Previous
      </Button>
      {currentStep < steps.length - 1 && (
        <Button onPress={handleNext} color="primary" radius="sm">
          Next
        </Button>
      )}
      {currentStep === steps.length - 1 && (
        <Button
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          onPress={triggersubmit}
          color="primary"
          radius="sm"
        >
          Submit
        </Button>
      )}
    </div>
  );
};
