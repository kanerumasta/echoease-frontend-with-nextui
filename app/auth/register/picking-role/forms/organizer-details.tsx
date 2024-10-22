//if user is even organizer show this form

import { ImagePicker } from "@/components/image-picker";
import { MultipleImagePicker } from "@/components/multiple-image-picker";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  images: File[] | null;
  setImages: Dispatch<SetStateAction<File[] | null>>;
  productionPage: string | null;
  setProductionPage: Dispatch<SetStateAction<string | null>>;
  businessName: string | null;
  setBusinessName: Dispatch<SetStateAction<string | null>>;
  businessImage: File | null;
  setBusinessImage: Dispatch<SetStateAction<File | null>>;
};

export default function OrganizerForm({
  images,
  setImages,
  productionPage,
  setProductionPage,
  businessImage,
  businessName,
  setBusinessImage,
  setBusinessName
}: Props) {
  return (
    <div className=" space-y-2">
        <h1 className="text-2xl text-white/50 mb-4">Event Organizer</h1>

      <Input
        radius="sm"
        size="lg"
        value={productionPage ? productionPage : ""}
        onValueChange={setProductionPage}
        label="Facebook Page Link (optional)"
        placeholder="Paste your facebook page link."
      />
      <Spacer y={4} />
      <Input
        radius="sm"
        size="lg"
        label="Facebook Page Name (optional) "
        value={businessName ?? ''}
        onValueChange={setBusinessName}/>
        <div className="flex gap-3">
            <div>
        <p className="mb-2 text-white/50">Business Image or Logo</p>
        <ImagePicker width={200} height={200} imagePicked={businessImage} setImagePicked={setBusinessImage}/>
        </div>
      <div>
      <p className="mb-2 text-white/50">
        Past Events or Testimonies
      </p>

        <MultipleImagePicker
          width={300}
          height={200}
          imagesPicked={images}
          setImagePicked={setImages}
        />
        </div>
      </div>
    </div>
  );
}
