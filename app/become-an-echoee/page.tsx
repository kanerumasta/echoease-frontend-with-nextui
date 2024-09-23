"use client";

import useCompleteProfile from "@/hooks/use-complete-profile";
import {
  useCreateArtistApplicationMutation,
  useFetchAcceptedIdsQuery,
  useFetchGenresQuery,
} from "@/redux/features/artistApiSlice";
import { ArtistApplicationSchema } from "@/schemas/artist-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  Fragment,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { toast } from "react-toastify";
import { z } from "zod";

const EchoeeRegistrationForm = () => {
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
    { name: "step1", id: 0, fields: ["bio", "genres", "rate"] },
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
      formData.append(`sample_video${index}`, vid);
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
      console.log(payload);
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
        {currentStep === 0 && <Identity />}
        {currentStep === 1 && <MediaUpload />}
        {currentStep === 2 && <Validation />}
        {currentStep === 3 && <Links />}
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

export default function EchoeeRegistrationPage() {
  useCompleteProfile("/become-an-echoee");
  return (
    <div className="w-full md:w-[50%] mx-auto">
      <EchoeeRegistrationForm />
    </div>
  );
}

const Identity = () => {
  const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
  const { data: genres, isLoading: isGenresLoading } = useFetchGenresQuery();

  const { fields, append, remove } = useFieldArray<
    z.infer<typeof ArtistApplicationSchema>
  >({
    name: "rates",
  });

  return (
    <Fragment>
      <Textarea
        {...form.register("bio")}
        variant="faded"
        isRequired
        radius="sm"
        label="Description"
        isInvalid={!!form.formState.errors.bio}
        errorMessage={form.formState.errors.bio?.message}
        placeholder="Type your artist description here..."
      />
      {genres && (
        <Select
          variant="faded"
          isRequired
          label="Genres"
          isInvalid={!!form.formState.errors.genres}
          errorMessage={form.formState.errors.genres?.message}
          size="lg"
          placeholder="Select your genres"
          radius="sm"
          isMultiline
          selectedKeys={form.watch("genres")}
          selectionMode="multiple"
          aria-label="select genres"
          onChange={(e) => form.setValue("genres", e.target.value.split(","))}
          renderValue={(items) => (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip color="primary" key={item.key}>
                  {item.textValue}
                </Chip>
              ))}
            </div>
          )}
        >
          {genres?.map((gen) => (
            <SelectItem key={gen.id}>{gen.name}</SelectItem>
          ))}
        </Select>
      )}

      {fields.map((item, index) => (
        <div key={item.id}>
          <Input
            {...form.register(`rates.${index}.name`)}
            placeholder="rates Name"
          />

          <Input
            type="text"
            {...form.register(`rates.${index}.amount`)}
            placeholder="Amount"
          />

          <button type="button" onClick={() => remove(index)}>
            Remove Rate
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "", amount: "" })}>
        Add Rate
      </button>
    </Fragment>
  );
};

const Links = () => {
  const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
  return (
    <Fragment>
      <Input
        {...form.register("twitter")}
        size="lg"
        radius="sm"
        startContent={<Image width={24} src="/media/twitter.png" />}
        placeholder="Twitter"
      />
      <Input
        {...form.register("fb_link")}
        size="lg"
        radius="sm"
        startContent={<Image width={24} src="/media/facebook.png" />}
        placeholder="Twitter"
      />
      <Input
        {...form.register("youtube")}
        size="lg"
        radius="sm"
        startContent={<Image width={24} src="/media/youtube.png" />}
        placeholder="Twitter"
      />
      <Input
        {...form.register("instagram")}
        size="lg"
        radius="sm"
        startContent={<Image width={24} src="/media/instagram.png" />}
        placeholder="Twitter"
      />
      <Input
        {...form.register("spotify")}
        size="lg"
        radius="sm"
        startContent={<Image width={24} src="/media/spotify.png" />}
        placeholder="Twitter"
      />
    </Fragment>
  );
};

const MediaUpload = () => {
  const form = useFormContext();
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const sampleVideosInputRef = useRef<HTMLInputElement | null>(null);
  const selectedFiles: File[] | [] = form.watch("sampleVideos") || [];

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("bg-blue-100");
    }
  };

  // Handle drag leave event
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("bg-blue-100");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("bg-blue-100");
    }
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      const filteredFiles = [
        ...selectedFiles,
        ...newFiles.filter((file) => !isDuplicateFile(file, selectedFiles)),
      ];
      form.setValue("sampleVideos", filteredFiles);
    }
  };

  const isDuplicateFile = (file: File, files: File[]) => {
    return files.some(
      (existingFile) =>
        existingFile.name === file.name && existingFile.size === file.size
    );
  };
  return (
    <Fragment>
      <input
        accept="video/*"
        ref={sampleVideosInputRef}
        multiple
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files) {
            if (selectedFiles.length < 1) {
              form.setValue("sampleVideos", Array.from(e.target.files));
            } else {
              const newSelectedFiles = [
                ...selectedFiles,
                ...Array.from(e.target.files).filter(
                  (file) => !isDuplicateFile(file, selectedFiles)
                ),
              ];

              form.setValue("sampleVideos", newSelectedFiles);
            }
          }
        }}
      />
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="border-2 w-full border-dashed p-8 border-blue-300 rounded-lg"
      >
        {(!selectedFiles || selectedFiles?.length <= 0) && (
          <div
            onClick={() => {
              if (sampleVideosInputRef.current) {
                sampleVideosInputRef.current.click();
              }
            }}
            className="flex flex-col justify-center items-center min-w-[200px] h-[150px]  hover:cursor-pointer  "
          >
            <IoMdCloudUpload color="#2f9fe1" size={50} />
            <p className="text-center">Click or Drag & Drop File here</p>
          </div>
        )}

        <div>
          <ul>
            {selectedFiles?.map((videoFile) => (
              <li
                key={videoFile.name}
                className="flex items-center my-2 bg-blue-200 p-2 rounded-md justify-between"
              >
                <span>{videoFile.name}</span>

                <TiDelete
                  className="hover:cursor-pointer"
                  size={25}
                  onClick={() => {
                    const filteredFiles = selectedFiles?.filter(
                      (file) => file !== videoFile
                    );
                    form.setValue("sampleVideos", filteredFiles);
                  }}
                  color="#f34139"
                />
              </li>
            ))}
          </ul>
          {selectedFiles?.length < 3 && selectedFiles?.length > 0 && (
            <div
              onClick={() => {
                sampleVideosInputRef.current?.click();
              }}
              className="w-[60%] hover:cursor-pointer hover:bg-slate-200  rounded-lg mx-auto  flex flex-col items-center justify-center "
            >
              <MdAdd className="" color="#15e871" size={50} />
              <p>Add more</p>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const Validation = () => {
  const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
  const inputFrontRef = useRef<HTMLInputElement | null>(null);
  const inputBackRef = useRef<HTMLInputElement | null>(null);
  const {
    data: acceptedIds,
    isLoading: isAcceptedIdsLoading,
    isError: isAcceptedIdsError,
  } = useFetchAcceptedIdsQuery();
  const inputFrontClick = () => {
    if (inputFrontRef.current) {
      inputFrontRef.current.click();
    }
  };
  const inputBackClick = () => {
    if (inputBackRef.current) {
      inputBackRef.current.click();
    }
  };

  const onFrontInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      form.setValue("frontId", e.target.files[0]);
    }
  };
  const onBackInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      form.setValue("backId", e.target.files[0]);
    }
  };

  return (
    <Fragment>
      {acceptedIds && (
        <Select
          selectedKeys={[form.watch("idType")]}
          onChange={(e) => form.setValue("idType", e.target.value)}
          className=""
          label="ID Type"
          placeholder="Please select ID type"
          radius="sm"
          size="lg"
        >
          {acceptedIds.map((type) => (
            <SelectItem key={type.id}>{type.name}</SelectItem>
          ))}
        </Select>
      )}
      <input
        onChange={onFrontInputChange}
        ref={inputFrontRef}
        hidden
        type="file"
        accept="image/*"
      />
      <input
        onChange={onBackInputChange}
        ref={inputBackRef}
        hidden
        type="file"
        accept="image/*"
      />

      <div
        onClick={inputFrontClick}
        className="relative aspect-video border-2 border-dashed border-blue-400"
      >
        {form.watch("frontId") && (
          <Image
            radius="none"
            src={URL.createObjectURL(form.watch("frontId"))}
          />
        )}
        <p className="absolute top-[50%] left-[50%] z-10 translate-x-[-50%] translate-y-[-50%]y">
          Front
        </p>
      </div>
      <div
        onClick={inputBackClick}
        className="relative aspect-video border-2 border-dashed border-blue-400"
      >
        {/* {form.watch("backId") && (
          <Image
            radius="none"
            src={URL.createObjectURL(form.watch("backId"))}
          />
        )} */}
        <p className="absolute top-[50%] left-[50%] z-10 translate-x-[-50%] translate-y-[-50%]y">
          Back
        </p>
      </div>
    </Fragment>
  );
};

const Stepper = ({
  className = "",
  currentStep,
  setCurrentStep,
  steps,
  submit,
  isSubmitting,
}: {
  className?: string;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  steps: any;
  submit: () => void;
  isSubmitting: boolean;
}) => {
  const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
  type FieldName = keyof z.infer<typeof ArtistApplicationSchema>;
  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    console.log(fields);
    const isValid = await form.trigger(fields as FieldName[]);
    console.log(isValid);
    if (!isValid) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  return (
    <div className={className}>
      {currentStep > 0 && (
        <Button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          type="button"
        >
          Back
        </Button>
      )}
      {currentStep < steps.length - 1 ? (
        <Button color="primary" onClick={handleNext} type="button">
          Next
        </Button>
      ) : (
        <Button
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          onClick={submit}
        >
          Submit
        </Button>
      )}
    </div>
  );
};
