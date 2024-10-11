"use client";
import { useCreateBooking } from "@/hooks/bookings";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { Button } from "@nextui-org/button";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Fragment, useEffect, useRef, useState } from "react";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { FinalBookingStep } from "./final-step";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useFetchArtistRatesQuery } from "@/redux/features/artistApiSlice";

export const BookingForm = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const {data:currentUser} = useFetchCurrentUserQuery()

  const { data: rates } = useFetchArtistRatesQuery(artist.id.toString());
  const { form, bookingState, onSubmit } = useCreateBooking();
  const formRef = useRef<HTMLFormElement | null>(null);


  const steps = [
    {
      id: "step1",
      fields: [
        "eventName",
        "eventDate",
        "municipality",
        "barangay",
        "street",
        "landmark",
        "endTime",
        "startTime"
      ],
    },
    {
      id: "step2",
      fields: ["rate"],
    },
  ];
  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    console.log(fields)

    type FieldName = keyof z.infer<typeof BookingSchema>;

    const valid = await form.trigger();
    console.log(valid)

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

  useEffect(()=>{
    rates && form.setValue('rate', rates[0].id.toString())
  },[rates])

  return (
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
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {currentStep === 0 && <Step1 artist={artist}/>}
                {currentStep === 1 && <Step2 artist={artist}/>}
                {currentStep === 2 && currentUser && <FinalBookingStep artist={artist} currentUser={currentUser}/>}
              </form>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            {currentStep > 0 && (
              <Button onPress={() => setCurrentStep((prev) => --prev)}>
                Cancel
              </Button>
            )}

            {currentStep <= 1 && (
              <Button color="primary" onPress={handleNext}>
                Next
              </Button>
            )}
            {currentStep > 1 && (
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
  );
};
