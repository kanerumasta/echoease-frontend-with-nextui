"use client";

import { FormStepper } from "@/components/form-stepper";
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
      <div className="w-full rounded- p-4 relative md:w-[60%] bg-white/10 rounded-md lg:w-[50%] m-auto h-[500px] flex flex-col items-center ">
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
                productionPage={productionPage}
                setProductionPage={setProductionPage}
                images={organizerImages}
                setImages={setOrganizerImages}
              />
            )}
            {currentStep === 1 && rolePicked === "bar owner" && (
              <BarOwnerForm
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
        <FormStepper
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
