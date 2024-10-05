"use client";
import { HiX } from "react-icons/hi";
import { useCreateNewPortfolio } from "@/hooks/artists/use-create-new-portfolio";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, {
  Dispatch,
  Fragment,
  Ref,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useCreateNewPortfolioMutation,
  useFetchDetailCurrentArtistQuery,
  useFetchPortfolioQuery,
} from "@/redux/features/artistApiSlice";
import { toast } from "react-toastify";
import { DevTool } from "@hookform/devtools";
import CustomError from "@/components/custom-error";
import {
  InPortfolioItemSchema,
  InPortfolioSchema,
} from "@/schemas/artist-schemas";
import { z } from "zod";
import { FaPlay } from "react-icons/fa";
import { cn } from "@/lib/utils";
import useLoginRequired from "@/hooks/use-login-required";
import useIsArtistOnly from "@/hooks/use-is-artist-only";
import { notFound } from "next/navigation";

export default function PortfolioPage() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isUploadingPortfolio, setIsUploadingPortfolio] = useState(false);
  const {
    data: currentArtist,
    isLoading: isCurrentArtistLoading,
    isError: isCurrentArtistError,
  } = useFetchDetailCurrentArtistQuery();
  const {
    data: portfolio,
    refetch: refetchPortfolio,
  } = useFetchPortfolioQuery(currentArtist?.id?.toString() || "");

  const formReference = useRef<HTMLFormElement | null>(null);

  const reset = useCallback(() => {
    setIsUploadingPortfolio(false);
    setIsUploadSuccess(false);
    onClose();
  },[]);



  useEffect(() => {
    if (isUploadSuccess) {
      toast.success("Portfolio added");
      reset();
    }
  }, [isUploadSuccess]);
  useEffect(() => {
    if (currentArtist?.id) {
      refetchPortfolio();
    }
  }, [currentArtist?.id, refetchPortfolio]);
  return (
    <Fragment>
      {portfolio && <PortfolioItems portfolio={portfolio} />}
      <div>
        <Button onPress={onOpen}>Add a new portfolio item</Button>
      </div>
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <h1>Create a new portofolio</h1>
          </ModalHeader>
          <ModalBody>
            {currentArtist?.portfolio && (
              <AddNewPortfolioForm
                portfolio={currentArtist.portfolio.toString()}
                formRef={formReference}
                setUploadSuccess={setIsUploadSuccess}
                setUploading={setIsUploadingPortfolio}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose} radius="sm" color="default">
              Cancel
            </Button>
            <Button
              isLoading={isUploadingPortfolio}
              onPress={() => {
                if (formReference.current) {
                  formReference.current.requestSubmit();
                }
              }}
              radius="sm"
              color="secondary"
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

// portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name="items", null=True)
// title = models.CharField(max_length = 255, null=True, blank=True)
// description = models.CharField(max_length = 255, null=True, blank=True)
// group = models.CharField(max_length=50,default="portfolio",choices=GROUPS,null=True, blank=True)

// #LIMIT TWO VIDEOS AND 5 IMAGES
// video1 = models.FileField(upload_to="videos/",null=True, blank=True),
// video2 = models.FileField(upload_to="videos/",null=True, blank=True),

// image1 = models.ImageField(upload_to="images/", null=True, blank=True)
// image2 = models.ImageField(upload_to="images/", null=True, blank=True)
// image3 = models.ImageField(upload_to="images/", null=True, blank=True)
// image4 = models.ImageField(upload_to="images/", null=True, blank=True)
// image5 = models.ImageField(upload_to="images/", null=True, blank=True)

const PortfolioItems = React.memo(({
  portfolio,
}: {
  portfolio: z.infer<typeof InPortfolioSchema>;
}) => {
  return (
    <Fragment>
      {portfolio.items.map((item, index) => {
        return (
          <div className="flex flex-col justify-center">
            <p>{item.title}</p>
            {item.description && <p>{item.description}</p>}
            <Grid item={item} />
          </div>
        );
      })}
    </Fragment>
  );
});

const Grid = ({ item }: { item: z.infer<typeof InPortfolioItemSchema> }) => {
  const maxVisible = 4; // Maximum number of media to display
  const allMedia = [...item.videos, ...item.images]; // Combine videos and images into one array
  const visibleMedia = allMedia.slice(0, maxVisible); // Show only the first 9 media
  const remainingCount = allMedia.length - maxVisible;
  return (
    <div className="grid relative grid-cols-2 grid-rows-2 w-full md:w-[50%] gap-2">
      {visibleMedia.map((media, mediaIndex) => (
        <div
          key={mediaIndex}
          className={cn(
            "hover:cursor-pointer hover:opacity-80 transition duration-150 ease-in-out flex-grow min-w-[150px]  max-h-[200px] rounded-md overflow-hidden",
            {
              relative: mediaIndex === 3,
            }
          )}
        >
          {media.endsWith(".mp4") ? (
            <div className="relative w-full h-full">
              <video className="w-full h-full object-cover" width={200}>
                <source src={`${process.env.NEXT_PUBLIC_HOST}${media}`} />
              </video>
              <FaPlay
                color="white"
                size={30}
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              />
            </div>
          ) : (
            <img
              className="w-full h-full object-cover"
              width={200}
              height={200}
              src={`${process.env.NEXT_PUBLIC_HOST}${media}`}
              alt="Portfolio Media"
            />
          )}
          {mediaIndex === 3 && maxVisible < allMedia.length && (
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 flex items-center justify-center text-3xl text-white w-full h-full rounded-md z-10">
              {`+${remainingCount}`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const AddNewPortfolioForm = ({
  formRef,
  setUploading,
  setUploadSuccess,
  portfolio,
}: {
  formRef: React.RefObject<HTMLFormElement>;
  setUploading: Dispatch<SetStateAction<boolean>>;
  setUploadSuccess: Dispatch<SetStateAction<boolean>>;
  portfolio: string;
}) => {
  const { form, onSubmit, isLoading, isError, isSuccess } =
    useCreateNewPortfolio();
  const videosInputReference = useRef<HTMLInputElement | null>(null);

  const imagesInputReference = useRef<HTMLInputElement | null>(null);
  const selectedVideos: File[] | [] = form.watch("videos") || [];
  const selectedImages: File[] | [] = form.watch("images") || [];

  const isDuplicateFile = (file: File, files: File[]) => {
    return files.some(
      (existingFile) =>
        existingFile.name === file.name && existingFile.size === file.size
    );
  };

  const removeFile = (index: number, fileFieldName: "videos" | "images") => {
    const files = form.watch(fileFieldName);
    const updatedFiles = files?.filter((_, i) => i !== index); // Exclude the clicked file
    form.setValue(fileFieldName, updatedFiles); // Update the form state
  };

  useEffect(() => {
    if (isLoading) {
      setUploading(true);
    }
    if (isSuccess) {
      setUploadSuccess(true);
    }
    if (isError) {
      toast.error("error");
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
      <input
        {...form.register("portfolio")}
        value={portfolio}
        style={{ display: "none" }}
      />
      <input
        ref={videosInputReference}
        type="file"
        accept="video/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files) {
            if (selectedVideos.length < 1) {
              form.setValue("videos", Array.from(e.target.files));
            } else {
              const newselectedVideos = [
                ...selectedVideos,
                ...Array.from(e.target.files).filter(
                  (file) => !isDuplicateFile(file, selectedVideos)
                ),
              ];

              form.setValue("videos", newselectedVideos);
            }
          }
        }}
      />
      <input
        ref={imagesInputReference}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files) {
            if (selectedImages.length < 1) {
              form.setValue("images", Array.from(e.target.files));
            } else {
              const newselectedImages = [
                ...selectedImages,
                ...Array.from(e.target.files).filter(
                  (file) => !isDuplicateFile(file, selectedImages)
                ),
              ];

              form.setValue("images", newselectedImages);
            }
          }
        }}
      />

      <Input
        radius="sm"
        size="lg"
        variant="faded"
        label="Title"
        placeholder="What is this portfolio all about?"
        isInvalid={!!form.formState.errors.title}
        errorMessage={form.formState.errors.title?.message}
        {...form.register("title")}
      />
      <Textarea
        radius="sm"
        size="lg"
        variant="faded"
        label="Description"
        isInvalid={!!form.formState.errors.description}
        errorMessage={form.formState.errors.description?.message}
        placeholder="You can describe about this portfolio here"
        {...form.register("description")}
      />
      <div className="h-[200px] flex items-center flex-col border-2 border-dashed border-blue-500 rounded-lg">
        <div
          onClick={() => {
            if (videosInputReference.current) {
              videosInputReference.current.click();
            }
          }}
          className="p-4 rounded-lg bg-blue-300 w-[50%]"
        >
          Upload
        </div>
        Drag or Upload videos here
        <div className="flex">
          {form.watch("videos")?.map((fl, index) => (
            <div className="overflow-hidden w-[180px] h-[100px] rounded-lg relative">
              <video
                key={fl.name}
                className="w-full h-full object-cover"
                width={180}
              >
                <source src={URL.createObjectURL(fl)} />
              </video>
              <HiX
                onClick={() => removeFile(index, "videos")}
                color="white"
                className=" rounded-full absolute top-2 right-2 hover:bg-red-500"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="h-[200px] border-2 border-dashed border-blue-500 rounded-lg">
        <div
          onClick={() => {
            if (imagesInputReference.current) {
              imagesInputReference.current.click();
            }
          }}
        >
          Upload
        </div>
        Drag or Upload images here
        <div className="flex">
          {form.watch("images")?.map((fl, index) => (
            <div className="relative w-[100px] flex flex-wrap h-[100px] overflow-hidden rounded-md">
              <img
                key={fl.name}
                className="w-full h-full object-cover"
                src={URL.createObjectURL(fl)}
              />
              <HiX
                onClick={() => removeFile(index, "images")}
                className="absolute top-2 right-2"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="text-red-500">{form.formState.errors.images?.message}</p>
      <DevTool control={form.control} />
    </form>
  );
};
