"use client";

import { AcceptedIdsPicker } from "@/components/accepted-id-picker";
import { ImagePicker } from "@/components/image-picker";
import { useFetchAcceptedIdsQuery } from "@/redux/features/artistApiSlice";
import { RolePickingSchema } from "@/schemas/user-schemas";
import { Spacer } from "@nextui-org/spacer";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

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

  const form = useFormContext<z.infer<typeof RolePickingSchema>>();

  return (
    <div className=" mt-12">

        <AcceptedIdsPicker
          setPicked={setGovernmentIdType}
          picked={governmentIdType}
        />
        <Spacer y={4}/>

      <ImagePicker
        isDisabled={!governmentIdType}
        width={280}
        imagePicked={governmentId}
        setImagePicked={setGovernmentId}
      />
    </div>
  );
}
