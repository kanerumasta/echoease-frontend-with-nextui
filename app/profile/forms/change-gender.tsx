import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { z } from "zod";

import { UserSchema } from "@/schemas/user-schemas";
import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice";
import { EditIcon } from "@/components/icons/edit";
import GenderPicker from "@/components/gender-picker";

export const ChangeGender = ({
  user,
}: {
  user: z.infer<typeof UserSchema>;
}) => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const [updateProfile, { isSuccess, isError }] = useUpdateProfileMutation();

  const handleSubmit = async () => {
    if (user.profile?.gender !== gender) {
      const payload = {
        gender: gender,
      };

      await updateProfile(payload);
      onClose();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Gender changed!");
    }
    if (isError) {
      toast.error("Failed updating gender. Please try again.");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <EditIcon onClick={onOpen} />
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Edit Gender</ModalHeader>
          <ModalBody>
            <div>
              <GenderPicker
                value={gender}
                onChange={(value) => setGender(value)}
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button radius="sm" startContent={<MdCancel />} onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                radius="sm"
                startContent={<FaSave />}
                onPress={handleSubmit}
              >
                Save
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
