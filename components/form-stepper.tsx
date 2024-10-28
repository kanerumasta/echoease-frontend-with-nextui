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
        color="default"
        isDisabled={currentStep <= 0}
        radius="sm"
        onPress={handleBack}
      >
        Previous
      </Button>
      {currentStep < steps.length - 1 && (
        <Button color="primary" radius="sm" onPress={handleNext}>
          Next
        </Button>
      )}
      {currentStep === steps.length - 1 && (
        <Button
          color="primary"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          radius="sm"
          onPress={triggersubmit}
        >
          Submit
        </Button>
      )}
    </div>
  );
};
