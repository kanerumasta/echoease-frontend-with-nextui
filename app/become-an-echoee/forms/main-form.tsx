'use client'

import { useCreateArtistApplicationMutation } from "@/redux/features/artistApiSlice";
import { ArtistApplicationSchema } from "@/schemas/artist-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Stepper from "./stepper";
import Step4 from "./step4";

//become an echoee Main Form Registration
export default function MainForm() {
    const form = useForm<z.infer<typeof ArtistApplicationSchema>>({
      resolver: zodResolver(ArtistApplicationSchema),
    });

    const [
      createArtistApplication,
      { isLoading: isApplicationSubmitting, isError: isApplicationError },
    ] = useCreateArtistApplicationMutation();
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
    ];

    function triggerSubmitForm() {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
    const onSubmit = async (data: z.infer<typeof ArtistApplicationSchema>) => {
      const formData = new FormData();
      formData.append("bio", data.bio),
        data.genres.forEach((gen) => {
          formData.append("genres", gen);
        });

      data.sampleVideos.forEach((vid, index) => {
        formData.append(`sample_video${index+1}`, vid);
      });
      formData.append("id_type", data.idType);
      formData.append("front_id", data.frontId);
      if (data.backId) {
        formData.append("back_id", data.backId);
      }
      {
        data.instagram && formData.append("instagram", data.instagram);
      }
      {
        data.fb_link && formData.append("fb_link", data.fb_link);
      }
      {
        data.youtube && formData.append("youtube", data.youtube);
      }
      {
        data.spotify && formData.append("spotify", data.spotify);
      }
      {
        data.twitter && formData.append("twitter", data.twitter);
      }
      console.log(data);
      const artistApplication = await createArtistApplication(formData).unwrap();
      data.rates.forEach(async (r) => {
        const payload = {
          artist_application: artistApplication.id,
          name: r.name,
          amount: r.amount,
        };
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/artists/rates`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        console.log("submitted");
      });
    };
    return (
      <FormProvider {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          {currentStep === 0 && <Step1 />}
          {currentStep === 1 && <Step2 />}
          {currentStep === 2 && <Step3 />}
          {currentStep === 3 && <Step4 />}
        </form>

        {/* step controller */}
        <Stepper
          isSubmitting={isApplicationSubmitting}
          className="mt-4 flex justify-between"
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          submit={triggerSubmitForm}
        />
      </FormProvider>
    );
  };
