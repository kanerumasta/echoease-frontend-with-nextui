import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction } from "react";

import { ImagePicker } from "@/components/image-picker";

type BarOwnerProps = {
  businessPermit: File | null;
  setBusinessPermit: Dispatch<SetStateAction<File | null>>;
  businessName: string | null;
  setBusinessName: Dispatch<SetStateAction<string | null>>;
  businessImage: File | null;
  setBusinessImage: Dispatch<SetStateAction<File | null>>;
};

export default function BarOwnerForm({
  businessPermit,
  setBusinessPermit,
  businessName,
  setBusinessName,
  businessImage,
  setBusinessImage,
}: BarOwnerProps) {
  return (
    <div className=" mt-12 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white/50 mb-4">Bar Owner</h1>
      <Input
        label="Business Name"
        radius="sm"
        size="lg"
        value={businessName ?? ""}
        variant="bordered"
        onValueChange={setBusinessName}
      />
      <div className="flex gap-4">
        <div>
          <p className="mb-2 text-white/50">Business Image</p>

          <ImagePicker
            height={200}
            imagePicked={businessImage}
            setImagePicked={setBusinessImage}
            width={200}
          />
        </div>
        <div>
          <p className="mb-2 text-white/50">Business Permit</p>

          <ImagePicker
            height={200}
            imagePicked={businessPermit}
            setImagePicked={setBusinessPermit}
            width={200}
          />
        </div>
      </div>
    </div>
  );
}
