import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { z } from "zod";

import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice";
import PhoneIcon from "@/components/icons/phone";
import { EditIcon } from "@/components/icons/edit";

export const ChangePhone = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof PhoneSchema>>({
    resolver: zodResolver(PhoneSchema),
  });

  const [updateProfile, { isSuccess, isError, isLoading }] =
    useUpdateProfileMutation();
  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();
  const onSubmit = async (data: z.infer<typeof PhoneSchema>) => {
    await updateProfile(data).unwrap();
    reset();
    onClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Phone number updated successfully.");
    }
    if (isError) {
      toast.error("Failed updating your phone number. Please try again.");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <EditIcon onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          reset();
          onOpenChange();
        }}
      >
        <ModalContent>
          <ModalHeader>Edit Phone Number</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  errorMessage={errors.phone?.message}
                  isInvalid={!!errors.phone}
                  startContent={"+63"}
                  type="number"
                  {...register("phone")}
                  endContent={<PhoneIcon />}
                  label="New Phone Number"
                  placeholder="9xxxxxxxxx"
                  radius="sm"
                  size="lg"
                />
              </div>
              <div className="my-4 flex items-center justify-end gap-2">
                <Button
                  radius="sm"
                  size="lg"
                  startContent={<MdCancel />}
                  type="button"
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  radius="sm"
                  size="lg"
                  startContent={<FaSave />}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const PhoneSchema = z.object({
  phone: z
    .string()
    .length(10, { message: "Phone number must be 10 digits long" })
    .regex(/^9\d{9}$/, { message: "Phone number format is invalid." }),
});
