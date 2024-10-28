"use client";
import { Button } from "@nextui-org/button";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Fragment, useRef, useState } from "react";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { Spacer } from "@nextui-org/spacer";
import { toast } from "react-toastify";

import { useCreateBooking } from "@/hooks/bookings";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { UserSchema } from "@/schemas/user-schemas";

import { BookingProvider } from "./booking-provider";
import { FinalBookingStep } from "./final-step";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { Stepper } from "./form-stepper-progress";

export const BookingForm: React.FC<BookingFormProps> = ({
  artist,
  currentUser,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const { form, bookingState, onSubmit } = useCreateBooking(artist);
  const formRef = useRef<HTMLFormElement | null>(null);
  const totalSteps = 4;

  const steps = [
    {
      id: "step1",
      label: "Set The Stage",
      fields: ["eventName", "eventDate", "endTime", "startTime"],
    },
    {
      id: "step2",
      label: "Pin The Location",
      fields: ["municipality", "barangay", "street", "landmark", "venue"],
    },
    {
      id: "step3",
      label: "Choose your Experience",
      fields: ["rate"],
    },
    {
      id: "lastStep",
      label: "Review and Confirm",
      fields: [],
    },
  ];

  const handleNext = async () => {
    const fields = steps[currentStep].fields;

    type FieldName = keyof z.infer<typeof BookingSchema>;
    const valid = await form.trigger(fields as FieldName[]);

    if (!valid) {
      return;
    }

    setCurrentStep((prev) => ++prev);
  };

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const onError = (errors: any) => {
    toast.error("Failed submitting request. Please try again later.");
  };

  return (
    <BookingProvider artist={artist} currentUser={currentUser}>
      <ModalContent>
        {(onClose) => (
          <Fragment>
            <ModalHeader>
              <p>
                Secure
                <span className="font-bold capitalize text-blue-400">
                  {` ${artist?.user.first_name} ${artist?.user.last_name} `}
                </span>
                for your show!
              </p>
            </ModalHeader>
            <ModalBody>
              <Stepper currentStep={currentStep} totalSteps={totalSteps} />
              <Spacer y={6} />
              <p className=" text-lg text-right text-white/50">
                {steps[currentStep].label}
              </p>
              <FormProvider {...form}>
                <form
                  ref={formRef}
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit, onError)}
                >
                  {currentStep === 0 && <Step1 />}
                  {currentStep === 1 && <Step2 />}
                  {currentStep === 2 && <Step3 />}
                  {currentStep === 3 && currentUser && (
                    <FinalBookingStep
                      artist={artist}
                      currentUser={currentUser}
                    />
                  )}
                </form>
              </FormProvider>
            </ModalBody>
            <ModalFooter>
              {currentStep > 0 && (
                <Button onClick={() => setCurrentStep((prev) => --prev)}>
                  Previous
                </Button>
              )}

              {currentStep < steps.length - 1 && (
                <Button
                  className="capitalize"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                  {`${steps[currentStep + 1]?.label ? `: ${steps[currentStep + 1].label}` : ""}`}
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  color="primary"
                  isDisabled={bookingState.isLoading}
                  onClick={handleSubmitClick}
                >
                  Seal the Deal!
                </Button>
              )}
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </BookingProvider>
  );
};

type BookingFormProps = {
  artist: z.infer<typeof ArtistInSchema>;
  currentUser: z.infer<typeof UserSchema>;
};
