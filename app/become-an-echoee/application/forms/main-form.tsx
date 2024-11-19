"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Progress } from "@nextui-org/progress";
import Link from "next/link";

import { ArtistApplicationSchema } from "@/schemas/artist-schemas";
import { useCreateArtistApplicationMutation } from "@/redux/features/artistApiSlice";

import Step4 from "./step4";
import Stepper from "./stepper";
import Step3 from "./step3";
import Step2 from "./step2";
import Step1 from "./step1";

export default function MainForm() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof ArtistApplicationSchema>>({
    resolver: zodResolver(ArtistApplicationSchema),
  });

  const [createArtistApplication, { isLoading: isApplicationSubmitting }] =
    useCreateArtistApplicationMutation();
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);

  const steps = [
    { name: "step1", id: 0, fields: ["bio", "genres", "rates"] },
    { name: "step2", id: 1, fields: ["sampleVideos"] },
    { name: "step3", id: 2, fields: ["idType", "frontId", "backId"] },
    {
      name: "step4",
      id: 3,
      fields: ["instagram", "fb_link", "youtube", "spotify", "twitter"],
    },
    {
      name: "step5",
      id: 4,
      fields: ["account_holder_name", "acount_number"],
    },
  ];

  function triggerSubmitForm() {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }
  const onSubmit = async (data: z.infer<typeof ArtistApplicationSchema>) => {
    const formData = new FormData();

    formData.append("bio", data.bio);

    const cleanedGenres = data.genres.filter((gen) => gen !== "");

    cleanedGenres.forEach((gen) => {
      formData.append("genres", gen);
    });

    formData.append("id_type", data.idType);
    formData.append("front_id", data.frontId);
    if (data.backId) {
      formData.append("back_id", data.backId);
    }

    const optionalFields: (keyof typeof data)[] = [
      "instagram",
      "fb_link",
      "youtube",
      "spotify",
      "twitter",
      "stage_name",
    ];

    optionalFields.forEach((field) => {
      if (data[field]) formData.append(field, data[field] as string);
    });

    const artistApplication = await createArtistApplication(formData).unwrap();

    const ratePromises = data.rates.map((r) => {
      const payload = {
        artist_application: artistApplication.id,
        name: r.name,
        amount: r.amount,
      };

      return fetch(`${process.env.NEXT_PUBLIC_HOST}/api/artists/rates`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    });

    await Promise.all(ratePromises);
    const videoEntries = Array.from(data.sampleVideos.entries());

    setUploadProgress(1);
    for (const [index, vid] of videoEntries) {
      const videoFormData = new FormData();

      videoFormData.append(`sample_video${index + 1}`, vid);

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/artists/applications/${artistApplication.id}`,
          {
            method: "PATCH",
            body: videoFormData,
            credentials: "include",
          },
        );
        setUploadProgress((prev) => prev + 100 / data.sampleVideos.length);
      } catch (error) {
        console.log("Error occurred while uploading video", error);
      }
    }

    // Check upload progress and set success state
  };

  useEffect(() => {
    if (uploadProgress >= 100) {
      toast.success("Upload Successful!");
      setIsSuccess(true);
    }
  }, [uploadProgress]);

  return (
    <>
      <FormProvider {...form}>
        <form
          ref={formRef}
          className="space-y-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {currentStep === 0 && <Step1 />}
          {currentStep === 1 && <Step2 />}
          {currentStep === 2 && <Step3 />}
          {currentStep === 3 && <Step4 />}
        </form>

        {/* step controller */}
        <Stepper
          className="mt-4 flex justify-between"
          currentStep={currentStep}
          isSubmitting={isApplicationSubmitting}
          setCurrentStep={setCurrentStep}
          steps={steps}
          submit={triggerSubmitForm}
        />
      </FormProvider>
      <UploadModal
        isOpen={uploadProgress > 0}
        isSuccess={isSuccess}
        uploadProgress={uploadProgress}
      />
    </>
  );
}

type UploadModalProps = {
  uploadProgress: number;
  isOpen: boolean;
  isSuccess: boolean;
};
const UploadModal: React.FC<UploadModalProps> = ({
  uploadProgress,
  isSuccess,
  isOpen,
}) => {
  const router = useRouter();

  if (isSuccess) {
    return <SuccessModal isOpen={isOpen} />;
  }

  return (
    <Modal
      isDismissable
      classNames={{
        base: "bg-transparent",
        closeButton: "text-transparent",
        backdrop: "bg-black/90",
      }}
      isOpen={isOpen}
    >
      <ModalContent>
        <ModalBody>
          <div className="flex justify-center items-center">
            <Progress
              showValueLabel
              classNames={{
                base: "rounded-lg bg-white/10 p-3",
                indicator: "bg-gradient-to-r from-blue-500 to-purple-500",
                track: " rounded-lg bg-white h-[200px]",
                label: "text-white/50",
              }}
              label="Uploading..."
              radius="none"
              value={uploadProgress}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const SuccessModal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <>
      <Modal
        isDismissable
        classNames={{
          base: "bg-white text-black min-w-[500px]",
          header: "bg-green-500 text-white",
          backdrop: "bg-black",
          closeButton: "text-transparent",
        }}
        isOpen={isOpen}
      >
        <ModalContent>
          <ModalHeader>Echoee Application Submitted!</ModalHeader>

          <ModalBody>
            <div className="p-3 leading-9 text-black/50 text-lg">
              Thank you for submitting your artist application to EchoEase! Your
              application has been received, and our team will review it
              carefully. Please allow up to 3 working days for approval. We
              appreciate your patience and look forward to potentially welcoming
              you to our community!"
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Link
              className="text-xl text-blue-500 p-4 transition-all duration-300 rounded-lg hover:bg-black/5"
              href={"/"}
            >
              Back to Home
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
