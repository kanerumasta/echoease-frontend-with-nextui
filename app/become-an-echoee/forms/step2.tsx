'use client'

import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { Fragment, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export default function Step2() {
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
        <div>
            <p className="text-2xl font-semibold text-blue-400">Highlight Your Performances</p>
            <p className="text-sm text-white/50">Upload your works and videos to let your talent shine.</p>
        </div>
        <Spacer y={8}/>
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

        <div className="flex">
          <ul className="flex gap-2">
            {selectedFiles?.map((videoFile) => (
              <li
                key={videoFile.name}
                className="w-[100px] border-[1px] border-white/10 relative h-[100px] bg-blue-200 rounded-md overflow-hidden"
              >

                <video className="w-full h-full object-cover">
                    <source src={URL.createObjectURL(videoFile)}/>
                </video>
                <TiDelete
                  className="hover:cursor-pointer absolute top-1 right-1"
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

              className="flex ml-2 items-center "
            >
              <Button  onClick={() => {
                sampleVideosInputRef.current?.click();
              }} size="lg" className="text-white" variant="flat" color="success" isIconOnly><FaPlus /></Button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
