//if user is even organizer show this form

import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Dispatch, SetStateAction } from "react";

import { MultipleImagePicker } from "@/components/multiple-image-picker";
import { ImagePicker } from "@/components/image-picker";

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
  setBusinessName,
}: Props) {
  return (
    <div className=" space-y-2">
      <h1 className="text-2xl text-white/50 mb-4">Event Organizer</h1>

      <Input
        label="Facebook Page Link (optional)"
        placeholder="Paste your facebook page link."
        radius="sm"
        size="lg"
        value={productionPage ? productionPage : ""}
        onValueChange={setProductionPage}
      />
      <Spacer y={4} />
      <Input
        label="Facebook Page Name (optional) "
        radius="sm"
        size="lg"
        value={businessName ?? ""}
        onValueChange={setBusinessName}
      />
      <div className="flex gap-3">
        <div>
          <p className="mb-2 text-white/50">Business Image or Logo</p>
          <ImagePicker
            height={200}
            imagePicked={businessImage}
            setImagePicked={setBusinessImage}
            width={200}
          />
        </div>
        <div>
          <p className="mb-2 text-white/50">Past Events or Testimonies</p>

          <MultipleImagePicker
            height={200}
            imagesPicked={images}
            setImagePicked={setImages}
            width={300}
          />
        </div>
      </div>
    </div>
  );
}
