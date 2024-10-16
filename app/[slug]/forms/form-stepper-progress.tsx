import { useMemo } from "react";

type StepperProps = {
  currentStep: number;
  totalSteps: number;
};

export const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = useMemo(
    () => ((currentStep + 1) / totalSteps) * 100,
    [currentStep, totalSteps]
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
      <div className="relative w-full h-2 bg-gray-300 rounded">
        <div
          className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};
