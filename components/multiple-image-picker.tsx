"use client";

import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { FaUpload } from "react-icons/fa";

type MultipleImagePickerProps = {
  width?: number;
  height?: number;

  imagesPicked: File[] | null;
  setImagePicked: Dispatch<SetStateAction<File[] | null>>;
};

export const MultipleImagePicker = (props: MultipleImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputchange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      props.setImagePicked(Array.from(event.target.files));
    }
  };

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <input
        onChange={handleInputchange}
        type="file"
        multiple
        accept={"image/*"}
        ref={inputRef}
        style={{ display: "none" }}
      />
      <div
        className={
          "hover:cursor-pointer border-2 border-dashed rounded-lg flex items-center hover:bg-white/10 justify-center border-blue-400"
        }
        style={{
          width: props.width ? `${props.width}px` : "200px",
          height: props.height ? `${props.height}px` : "200px",
        }}
        onClick={handleDivClick}
      >
        {props.imagesPicked ? (
          Array.from(props.imagesPicked).map((img) => (
            <div className="w-[200px] h-[200px]">
              <img
                className="w-full h-full object-cover"
                src={URL.createObjectURL(img)}
              />
            </div>
          ))
        ) : (
          <FaUpload size={40} color="#03a9f4" />
        )}
      </div>
    </div>
  );
};
