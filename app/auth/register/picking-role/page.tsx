"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { Dispatch, Ref, RefObject, SetStateAction } from "react";

import { useRolePicking } from "@/hooks/account";

import {
  BarOwnerForm,
  EventOrganizerForm,
  GeneralDocumentsForm,
  RolePickingForm,
} from "./forms";

export default function PickingRolePage() {
  return (
    <Suspense>
      <div className="min-h-screen">
        <MainForm />
      </div>
    </Suspense>
  );
}

const MainForm = () => {
  const { form, onsubmit, isLoading, isError, isSuccess } = useRolePicking();
  const [currentStep, setCurrentStep] = useState(0);
  const [rolePicked, setRolePicked] = useState<string>("regular");
  const [businessPermit, setBusinessPermit] = useState<File | null>(null);
  const [govId, setGovId] = useState<File | null>(null);
  const [govIdType, setGovIdType] = useState<number | null>(null);
  const [organizerImages, setOrganizerImages] = useState<File[] | null>(null);
  const [productionPage, setProductionPage] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [businessImage, setBusinessImage] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const formRef = useRef<HTMLFormElement | null>(null);
  const formSteps = ["role", "organizer or bar", "general"];

  useEffect(() => {
    rolePicked && form.setValue("category", rolePicked);
    businessPermit && form.setValue("business_permit", businessPermit);
    govId && form.setValue("government_id", govId);
    govIdType && form.setValue("government_id_type", govIdType.toString());
    organizerImages && form.setValue("organizer_images", organizerImages);
    productionPage && form.setValue("production_page", productionPage);
    businessImage && form.setValue("businessImage", businessImage);
    businessName && form.setValue("businessName", businessName);
  }, [
    rolePicked,
    businessPermit,
    govId,
    govIdType,
    organizerImages,
    productionPage,
    businessImage,
    businessName,
  ]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successful");
      setTimeout(() => {
        window.location.href = redirect;
      }, 1000);
    }
    if (isError) {
      toast.error("Error submitting");
    }
    console.log("iscuss", isSuccess);
    console.log("iserror", isError);
  }, [isSuccess, isLoading, isError]);

  return (
    <Suspense>
      <div className="w-full rounded- p-4 relative md:w-[60%] bg-black border-[1px] border-white/10  rounded-md lg:w-[50%] m-auto  flex flex-col items-center ">
        <FormProvider {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onsubmit)}>
            {currentStep === 0 && (
              <RolePickingForm
                rolePicked={rolePicked}
                roles={["regular", "event organizer", "bar owner"]}
                setRolePicked={setRolePicked}
              />
            )}
            {currentStep === 1 && rolePicked === "event organizer" && (
              <EventOrganizerForm
                businessImage={businessImage}
                businessName={businessName}
                images={organizerImages}
                productionPage={productionPage}
                setBusinessImage={setBusinessImage}
                setBusinessName={setBusinessName}
                setImages={setOrganizerImages}
                setProductionPage={setProductionPage}
              />
            )}
            {currentStep === 1 && rolePicked === "bar owner" && (
              <BarOwnerForm
                businessImage={businessImage}
                businessName={businessName}
                businessPermit={businessPermit}
                setBusinessImage={setBusinessImage}
                setBusinessName={setBusinessName}
                setBusinessPermit={setBusinessPermit}
              />
            )}
            {currentStep === 1 && rolePicked === "regular" && (
              <GeneralDocumentsForm
                governmentId={govId}
                governmentIdType={govIdType}
                setGovernmentId={setGovId}
                setGovernmentIdType={setGovIdType}
              />
            )}

            {currentStep === 2 && rolePicked !== "regular" && (
              <GeneralDocumentsForm
                governmentId={govId}
                governmentIdType={govIdType}
                setGovernmentId={setGovId}
                setGovernmentIdType={setGovIdType}
              />
            )}
          </form>

          {/* Stepper */}
        </FormProvider>
        <Spacer y={12} />
        <FormStepper
          className=" absolute bottom-2 right-2 flex gap-4"
          currentStep={currentStep}
          formRef={formRef}
          govId={govId}
          isSubmitting={isLoading}
          setCurrentStep={setCurrentStep}
          steps={formSteps}
        />
      </div>
    </Suspense>
  );
};

type Props = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  className: string;
  formRef: Ref<HTMLFormElement | null>;
  steps: string[];
  isSubmitting?: boolean;
  govId: File | null;
};

const FormStepper = ({
  className,
  currentStep,
  setCurrentStep,
  formRef,
  steps,
  isSubmitting,
  govId,
}: Props) => {
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const triggersubmit = () => {
    if (!govId) {
      toast.error("Please upload government id");

      return false;
    }
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
