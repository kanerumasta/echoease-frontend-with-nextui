"use client";


import { useRolePicking } from "@/hooks/account";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import {
  BarOwnerForm,
  EventOrganizerForm,
  GeneralDocumentsForm,
  RolePickingForm,
} from "./forms";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { Dispatch, Ref, RefObject, SetStateAction } from "react";


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
  const [govIdType, setGovIdType] = useState<number |null>(null);
  const [organizerImages, setOrganizerImages] = useState<File[] | null>(null);
  const [productionPage, setProductionPage] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string|null>(null);
  const [businessImage, setBusinessImage] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const open = searchParams.get('open') || '0'

  const formRef = useRef<HTMLFormElement | null>(null);

  const formSteps = ["role", "organizer or bar", "general"];

  useEffect(() => {
    rolePicked && form.setValue("category", rolePicked);
    businessPermit && form.setValue("business_permit", businessPermit);
    govId && form.setValue("government_id", govId);
    govIdType && form.setValue("government_id_type", govIdType.toString());
    organizerImages && form.setValue("organizer_images", organizerImages);
    productionPage && form.setValue("production_page", productionPage);
  }, [
    rolePicked,
    businessPermit,
    govId,
    govIdType,
    organizerImages,
    productionPage,
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
                setRolePicked={setRolePicked}
                roles={["regular", "event organizer", "bar owner"]}
              />
            )}
            {currentStep === 1 && rolePicked === "event organizer" && (
              <EventOrganizerForm
              businessImage={businessImage}
              setBusinessImage={setBusinessImage}
              businessName={businessName}
              setBusinessName={setBusinessName}
                productionPage={productionPage}
                setProductionPage={setProductionPage}
                images={organizerImages}
                setImages={setOrganizerImages}
              />
            )}
            {currentStep === 1 && rolePicked === "bar owner" && (
              <BarOwnerForm
              businessName={businessName}
              setBusinessName={setBusinessName}
              businessImage={businessImage}
              setBusinessImage={setBusinessImage}
                businessPermit={businessPermit}
                setBusinessPermit={setBusinessPermit}
              />
            )}
            {currentStep === 1 && rolePicked === "regular" && (
              <GeneralDocumentsForm
                setGovernmentId={setGovId}
                governmentId={govId}
                governmentIdType={govIdType}
                setGovernmentIdType={setGovIdType}
              />
            )}

            {currentStep === 2 && rolePicked !== "regular" && (
              <GeneralDocumentsForm
                setGovernmentId={setGovId}
                governmentId={govId}
                governmentIdType={govIdType}
                setGovernmentIdType={setGovIdType}
              />
            )}
          </form>

          {/* Stepper */}
        </FormProvider>
        <Spacer y={12}/>
        <FormStepper
        govId={govId}
          isSubmitting={isLoading}
          formRef={formRef}
          steps={formSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          className=" absolute bottom-2 right-2 flex gap-4"
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
    if(!govId){
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
