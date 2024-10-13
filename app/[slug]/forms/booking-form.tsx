"use client";
import { useCreateBooking } from "@/hooks/bookings";
import { useFetchArtistRatesQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { UserSchema } from "@/schemas/user-schemas";
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
import { BookingProvider } from "./booking-provider";
import { FinalBookingStep } from "./final-step";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";

export const BookingForm: React.FC<BookingFormProps> = ({ artist, currentUser }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const { data: rates } = useFetchArtistRatesQuery(artist.id.toString());
  const { form, bookingState, onSubmit } = useCreateBooking(artist);
  const formRef = useRef<HTMLFormElement | null>(null);

  const steps = [
    {
      id: "step1",
      fields: ["eventName", "eventDate", "endTime", "startTime"],
    },
    {
      id: "step2",
      fields: ["municipality", "barangay", "street", "landmark"],
    },
    {
      id: "step3",
      fields: ["rate"],
    },
  ];

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    console.log(fields);

    type FieldName = keyof z.infer<typeof BookingSchema>;
    const valid = await form.trigger(fields as FieldName[]);
    console.log(valid);

    if (!valid) {
        console.log('not valid')
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
    console.log("Form submission errors:", errors);
  };

  return (
    <BookingProvider artist={artist} currentUser={currentUser}>
      <ModalContent>
        {(onClose) => (
          <Fragment>
            <ModalHeader>
              <p>
                You are booking{" "}
                <span className="font-bold capitalize text-blue-400">
                  {`${artist?.user.first_name} ${artist?.user.last_name}`}
                </span>
              </p>
            </ModalHeader>
            <ModalBody>
              <FormProvider {...form}>
                <form
                  ref={formRef}
                  onSubmit={form.handleSubmit(onSubmit, onError)}
                  className="space-y-4"
                >
                  {currentStep === 0 && <Step1 />}
                  {currentStep === 1 && <Step2 />}
                  {currentStep === 2 && <Step3 />}
                  {currentStep === 3 && currentUser && (
                    <FinalBookingStep artist={artist} currentUser={currentUser} />
                  )}
                </form>
              </FormProvider>
            </ModalBody>
            <ModalFooter>
              {currentStep > 0 && (
                <Button onClick={() => setCurrentStep((prev) => --prev)}>
                  Cancel
                </Button>
              )}

              {currentStep <= 2 && (
                <Button color="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
              {currentStep > 2 && (
                <Button
                  onClick={handleSubmitClick}
                  isDisabled={bookingState.isLoading}
                  color="primary"
                >
                  Submit
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
