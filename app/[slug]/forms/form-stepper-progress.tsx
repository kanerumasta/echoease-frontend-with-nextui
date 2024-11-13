import { Progress } from "@nextui-org/progress";
import { useMemo } from "react";

type StepperProps = {
  currentStep: number;
  totalSteps: number;
};

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progressPercentage = useMemo(
    () => ((currentStep + 1) / totalSteps) * 100,
    [currentStep, totalSteps],
  );

  const steps = [
    { id: "step1", label: "Event Details" },
    { id: "step2", label: "Location" },
    { id: "step3", label: "Artist Rate" },
    { id: "final", label: "Review & Confirm" },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`text-sm font-medium ${
              currentStep >= index ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>

        <Progress value={progressPercentage} />

    </div>
  );
};
