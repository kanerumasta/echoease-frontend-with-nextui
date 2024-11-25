"use client";

import { Spacer } from "@nextui-org/spacer";
import { Dispatch, SetStateAction } from "react";

import { AcceptedIdsPicker } from "@/components/accepted-id-picker";
import { ImagePicker } from "@/components/image-picker";

type GeneralDocumentsProps = {
  governmentId: File | null;
  governmentIdBack: File | null;
  governmentIdType: number | null;

  setGovernmentId: Dispatch<SetStateAction<File | null>>;
  setGovernmentIdBack: Dispatch<SetStateAction<File | null>>;
  setGovernmentIdType: Dispatch<SetStateAction<number | null>>;
};

export default function GeneralDocumentsForm({
  governmentId,
  setGovernmentId,
  governmentIdBack,
  setGovernmentIdBack,
  governmentIdType,
  setGovernmentIdType,
}: GeneralDocumentsProps) {
  return (
    <div className=" mt-12">
      <AcceptedIdsPicker
        picked={governmentIdType}
        setPicked={setGovernmentIdType}
      />
      <Spacer y={4} />

      <div className="flex gap-3">
        <div>
            <p className="text-xl text-center font-bold mb-4">Front</p>
            <ImagePicker
                imagePicked={governmentId}
                isDisabled={!governmentIdType}
                setImagePicked={setGovernmentId}
                width={280}
            />
      </div>
      <div>
        <p className="text-xl text-center font-bold mb-4">Back</p>
        <ImagePicker
            imagePicked={governmentIdBack}
            isDisabled={!governmentIdType}
            setImagePicked={setGovernmentIdBack}
            width={280}
        />
      </div>
      </div>
    </div>
  );
}
