"use client";

import { Spacer } from "@nextui-org/spacer";
import { Dispatch, SetStateAction } from "react";

import { AcceptedIdsPicker } from "@/components/accepted-id-picker";
import { ImagePicker } from "@/components/image-picker";

type GeneralDocumentsProps = {
  governmentId: File | null;
  governmentIdType: number | null;

  setGovernmentId: Dispatch<SetStateAction<File | null>>;
  setGovernmentIdType: Dispatch<SetStateAction<number | null>>;
};

export default function GeneralDocumentsForm({
  governmentId,
  setGovernmentId,
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

      <ImagePicker
        imagePicked={governmentId}
        isDisabled={!governmentIdType}
        setImagePicked={setGovernmentId}
        width={280}
      />
    </div>
  );
}
