"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Spacer } from "@nextui-org/spacer";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";

import { UserSchema } from "@/schemas/user-schemas";
import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice";
import CustomImage from "@/components/image";
import { EditIcon } from "@/components/icons/edit";

const ChangeProfileSchema = z.object({
  profile_image: z.instanceof(File),
});

export default function ChangeProfileImage({
  currentUser,
}: {
  currentUser: z.infer<typeof UserSchema>;
}) {
  const [updateProfile, { isSuccess, isError, isLoading }] =
    useUpdateProfileMutation();
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const { handleSubmit, setValue, watch, reset } = useForm<
    z.infer<typeof ChangeProfileSchema>
  >({ resolver: zodResolver(ChangeProfileSchema) });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (data: z.infer<typeof ChangeProfileSchema>) => {
    console.log(data);
    if (data) {
      const formData = new FormData();

      formData.append("profile_image", data.profile_image);

      await updateProfile(formData);
      onClose();
      reset();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile image updated");
    }
    if (isError) {
      toast.error("Failed updating your profile image. Please try again");
    }
  }, [isSuccess, isError]);

  function handleModalClose(isOpen: boolean) {
    if (!isOpen) {
      reset(); // Reset the form when the modal is closed
    }
    onOpenChange(); // Maintain the default modal open state change behavior
  }
  function handleUploadFileClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <>
      <div className="absolute bottom-[-30%]">
        <CustomImage
          className="hover:cursor-pointer hover:opacity-80 ring-2 rounded-full ring-black/45 ring-offset-1 ring-offset-transparent"
          height="200px"
          src={`${currentUser?.profile?.profile_image}`}
          width="200px"
          onPress={onOpen}
        />
        <h1 className="absolute bg-gradient-to-br from-blue-500 to-purple-500  shadow-inner shadow-white/15  text-2xl whitespace-nowrap min-w-full -bottom-[40%] -left-4 text-center p-4 rounded-lg  text-white/70 capitalize">
          {currentUser?.fullname}
        </h1>
      </div>

      {/* Edit Profile Picture Modal */}
      <Modal
        classNames={{
          base: "bg-gradient-to-br from-blue-500/30 to-purple-500/30",
          body: "py-4",
        }}
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={handleModalClose}
      >
        <ModalContent>
          <ModalHeader>Profile Image</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative flex flex-col items-center ">
                <input
                  ref={inputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setValue("profile_image", e.target.files[0]);
                    }
                  }}
                />
                <CustomImage
                  height="300px"
                  src={
                    watch("profile_image")
                      ? URL.createObjectURL(watch("profile_image"))
                      : `${process.env.NEXT_PUBLIC_HOST}${currentUser?.profile?.profile_image}`
                  }
                  width="400px"
                />
                <div className="absolute transition-all duration-250 ease-in opacity-0 hover:opacity-100 top-0 left-0 w-full h-full bg-gradient-to-b from-black/5 to-black/80">
                  <Button
                    className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
                    type="button"
                    onPress={handleUploadFileClick}
                  >
                    <EditIcon />
                    Change Profile
                  </Button>
                </div>
              </div>
              <Spacer y={4} />
              {watch("profile_image") && (
                <Button
                  fullWidth
                  color="primary"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  radius="sm"
                  size="lg"
                  type="submit"
                >
                  <FaSave />
                  Save
                </Button>
              )}
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
