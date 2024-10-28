"use client";

import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { FaUpload } from "react-icons/fa";

import { cn } from "@/lib/utils";

type ImagePickerProps = {
  width?: number;
  height?: number;
  isDisabled?: boolean;
  label?: string;

  imagePicked: File | null;
  setImagePicked: Dispatch<SetStateAction<File | null>>;
};

export const ImagePicker = (props: ImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputchange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      props.setImagePicked(event.target.files[0]);
    }
  };

  const handleDivClick = () => {
    if (inputRef.current && !props.isDisabled) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        accept={"image/*"}
        disabled={props.isDisabled}
        style={{ display: "none" }}
        type="file"
        onChange={handleInputchange}
      />
      <div
        className={cn(
          "hover:cursor-pointer overflow-hidden border-3 border-dashed rounded-lg hover:bg-white/5 duration-100 transition-all border-blue-400 flex items-center justify-center ",
          { "border-gray-500": props.isDisabled },
        )}
        style={{
          width: props.width ? `${props.width}px` : "200px",
          height: props.height ? `${props.height}px` : "200px",
        }}
        onClick={handleDivClick}
      >
        {props.imagePicked ? (
          <img
            className="w-full h-full object-cover"
            src={URL.createObjectURL(props.imagePicked)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <FaUpload color="#03a9f4" size={40} />
            <p className="text-white/50">
              {props.label ? props.label : "Upload Here"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
