import { ImagePicker } from "@/components/image-picker";
import { Spacer } from "@nextui-org/spacer";
import { Dispatch, SetStateAction } from "react";

type BarOwnerProps = {
  businessPermit: File | null;
  setBusinessPermit: Dispatch<SetStateAction<File | null>>;
};

export default function BarOwnerForm({
  businessPermit,
  setBusinessPermit,
}: BarOwnerProps) {
  return (
    <div className=" mt-12 flex items-center flex-col">
      <p>Please upload a clear image of your business permit</p>
      <Spacer y={8} />
      <ImagePicker
        width={400}
        height={300}
        setImagePicked={setBusinessPermit}
        imagePicked={businessPermit}
      />
    </div>
  );
}
