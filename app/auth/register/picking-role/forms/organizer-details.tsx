//if user is even organizer show this form

import { MultipleImagePicker } from "@/components/multiple-image-picker";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  images: File[] | null;
  setImages: Dispatch<SetStateAction<File[] | null>>;
  productionPage: string | null;
  setProductionPage: Dispatch<SetStateAction<string | null>>;
};

export default function OrganizerForm({
  images,
  setImages,
  productionPage,
  setProductionPage,
}: Props) {
  return (
    <div className=" space-y-2">
      <Input
        radius="sm"
        size="lg"
        value={productionPage ? productionPage : ""}
        onValueChange={setProductionPage}
        label="Do you have an facebook page for your events?"
        placeholder="You can paste it here."
      />
      <Spacer y={8} />
      <p className="text-sm text-white/40">
        You can add images of past events, testimonies and other proof of being
        an event organizer.
      </p>
      <div className="w-full flex items-center justify-center">
        <MultipleImagePicker
          width={400}
          imagesPicked={images}
          setImagePicked={setImages}
        />
      </div>
    </div>
  );
}
