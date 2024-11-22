"use client";

import { useState } from "react";
import { z } from "zod";

import { UserSchema } from "@/schemas/user-schemas";

export const OnboardingGuide = ({
  user,
}: {
  user: z.infer<typeof UserSchema>;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const onBoardingSteps = [
    {
      title: `Welcome Echoee ${user.first_name}!`,
      description: "To sahfsf please follow the ;afsdifhsad;of",
    },
    {
      title: "Your Echoverse",
      description:
        "Echoverse is your echoee dashboard. bla blah blah blah you can see here ..",
    },
    {
      title: "Showcase your Performances",
      description:
        "You can add to your portfolio with your media of past peformances apsihfpsfsdfpoishdf",
    },
    {
      title: "Set Your Schedule",
      description:
        "For echoer to be able to hire you, you must set your schedule like your time available and unavailable days",
    },
    {
      title: "Youre all set up",
      description: "Now you can be hired by echoers and get paid",
    },
  ];

  return (
    <div className="absolute top-4 right-4">
      <h1>{onBoardingSteps[currentStep].title}</h1>
      <p>{onBoardingSteps[currentStep].description}</p>
      {currentStep < onBoardingSteps.length - 1 && (
        <button onClick={() => setCurrentStep((prev) => prev + 1)}>Next</button>
      )}
    </div>
  );
};
