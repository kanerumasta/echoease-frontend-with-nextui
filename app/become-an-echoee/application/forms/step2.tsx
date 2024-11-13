"use client";

import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { Fragment, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { z } from "zod";

import { ArtistApplicationSchema } from "@/schemas/artist-schemas";

export default function Step2() {
  const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
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
        existingFile.name === file.name && existingFile.size === file.size,
    );
  };
  const calculateSelectedFilesFileSize = () => {
    const sizeArr = selectedFiles.map((file) => file.size);
    const sum = sizeArr.reduce((acc, curVal) => acc + curVal, 0);

    return Math.ceil(sum / 1024 / 1024);
  };

  return (
    <Fragment>
      <div>
        <p className="text-2xl font-semibold text-blue-400">
          Highlight Your Performances
        </p>
        <p className="text-sm text-white/50">
          Upload your works and videos to let your talent shine.
        </p>
      </div>
      <Spacer y={8} />
      <input
        ref={sampleVideosInputRef}
        multiple
        accept="video/*"
        style={{ display: "none" }}
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            if (selectedFiles.length < 1) {
              form.setValue("sampleVideos", Array.from(e.target.files));
            } else {
              const newSelectedFiles = [
                ...selectedFiles,
                ...Array.from(e.target.files).filter(
                  (file) => !isDuplicateFile(file, selectedFiles),
                ),
              ];

              form.setValue("sampleVideos", newSelectedFiles);
            }
          }
        }}
      />
      <div
        ref={dropZoneRef}
        className="relative border-2 w-full border-dashed p-8 border-blue-300 rounded-lg"
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFiles.length > 0 && (
          <p className="absolute top-2 right-2 text-xs text-white/50">
            File Size: {calculateSelectedFilesFileSize()}MB
          </p>
        )}
        {(!selectedFiles || selectedFiles?.length <= 0) && (
          <div
            className="flex flex-col justify-center items-center min-w-[200px] h-[150px]  hover:cursor-pointer  "
            onClick={() => {
              if (sampleVideosInputRef.current) {
                sampleVideosInputRef.current.click();
              }
            }}
          >
            <IoMdCloudUpload color="#2f9fe1" size={50} />
            <p className="text-center">Click or Drag & Drop File here</p>
          </div>
        )}

        <div className="flex">
          <ul className="flex gap-2">
            {selectedFiles?.map((videoFile) => (
              <li
                key={videoFile.name}
                className="w-[100px] border-[1px] border-white/10 relative h-[100px] bg-blue-200 rounded-md overflow-hidden"
              >
                <video className="w-full h-full object-cover">
                  <source src={URL.createObjectURL(videoFile)} />
                </video>
                <TiDelete
                  className="hover:cursor-pointer absolute top-1 right-1"
                  color="#f34139"
                  size={25}
                  onClick={() => {
                    const filteredFiles = selectedFiles?.filter(
                      (file) => file !== videoFile,
                    );

                    form.setValue("sampleVideos", filteredFiles);
                  }}
                />
              </li>
            ))}
          </ul>
          {selectedFiles?.length < 3 && selectedFiles?.length > 0 && (
            <div className="flex ml-2 items-center ">
              <Button
                isIconOnly
                className="text-white"
                color="success"
                size="lg"
                variant="flat"
                onClick={() => {
                  sampleVideosInputRef.current?.click();
                }}
              >
                <FaPlus />
              </Button>
            </div>
          )}
        </div>
        {form.formState.errors.sampleVideos && (
          <p className="text-danger-500">
            {form.formState.errors.sampleVideos.message}
          </p>
        )}
      </div>
      <div className="text-xs text-white/50">
        <p>Please upload up to 3 videos.</p>
        <p>The maximum file size allowed is 150 MB.</p>
        <p>Accepted file format is .mp4</p>
      </div>
    </Fragment>
  );
}
