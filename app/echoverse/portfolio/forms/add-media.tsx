"use client";

import { Button } from "@nextui-org/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { toast } from "react-toastify";
import { z } from "zod";

import { InPortfolioItemSchema } from "@/schemas/artist-schemas";
import { useAddNewPortfolioItemMediaMutation } from "@/redux/features/artistApiSlice";
import CustomImage from "@/components/image";

export const AddMedia = ({
  portfolioItem,
  onClose,
}: {
  portfolioItem: z.infer<typeof InPortfolioItemSchema>;
  onClose: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [addNewPortfolioItemMedia, { isLoading, isError }] =
    useAddNewPortfolioItemMediaMutation();
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState("");
  const hasShownToast = useRef(false);
  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const numberOfVideos = portfolioItem.medias.filter(
    (media) => media.media_type === "video",
  ).length;
  const numberOfImages = portfolioItem.medias.filter(
    (media) => media.media_type === "image",
  ).length;

  useEffect(() => {
    if (!hasShownToast.current && numberOfVideos >= 2 && numberOfImages >= 5) {
      toast.error("This portfolio item is full.");
      hasShownToast.current = true;
      onClose();
    }
  }, [numberOfImages, numberOfVideos, onClose]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const media = e.target.files[0];

      if (media.name.endsWith(".mp4")) {
        if (numberOfVideos >= 2) {
          toast.error("You can only add up to 2 videos.");

          return;
        }
        setMediaType("video");
      } else {
        if (numberOfImages >= 5) {
          toast.error("You can only add up to 5 images");

          return;
        }
        setMediaType("image");
      }
      setFile(media);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();

      formData.append("portfolio_item", portfolioItem.id.toString());
      formData.append("media_type", mediaType);
      formData.append("file", file);
      await addNewPortfolioItemMedia(formData);
      toast.success("Upload successful!");
      setFile(null);
      setMediaType("");
      onClose();
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Uploading media failed. Please try again.");
    }
  }, [isError]);

  return (
    <div className="w-full space-y-3">
      <input
        ref={inputRef}
        accept="image/jpg, image/png, image/jpeg, video/mp4"
        style={{ display: "none" }}
        type="file"
        onChange={onInputChange}
      />
      <div
        className="w-full flex items-center justify-center min-h-[300px] border-dashed border-3 border-blue-500 rounded-lg"
        onClick={handleDivClick}
      >
        {file ? (
          file.name.endsWith(".mp4") ? (
            <div className="w-[250px] h-[200px] overflow-hidden rounded-md ">
              <video className="w-full h-full object-cover">
                <source src={URL.createObjectURL(file)} />
              </video>
            </div>
          ) : (
            <CustomImage
              height="200px"
              src={URL.createObjectURL(file)}
              width="200px"
            />
          )
        ) : (
          <IoAdd className="text-blue-600" size={40} />
        )}
      </div>
      <div className="flex gap-2 justify-end">
        <Button>Cancel</Button>
        <Button color="primary" isLoading={isLoading} onPress={handleUpload}>
          Upload
        </Button>
      </div>
    </div>
  );
};
