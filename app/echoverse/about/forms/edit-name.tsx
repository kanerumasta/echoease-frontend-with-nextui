"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ArtistInSchema } from "@/schemas/artist-schemas";
import { EditIcon } from "@/components/icons/edit";

const NameSchema = z.object({
  first_name: z
    .string()
    .regex(/^[A-Za-z]+$/, "First name should contain only letters"),
  last_name: z
    .string()
    .regex(/^[A-Za-z]*$/, "Last name should contain only letters"),
});

export const EditPersonalDetails = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const { register } = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
  });

  return (
    <>
      <Button isIconOnly>
        <EditIcon />
      </Button>
      <Modal>
        <ModalContent>
          <ModalHeader>Edit Personal Details</ModalHeader>
          <ModalBody>
            <form>
              <Input
                {...register("first_name")}
                defaultValue={artist.user.first_name}
                label="First Name"
              />
              <Input
                {...register("last_name")}
                defaultValue={artist.user.last_name}
                label="Last Name"
              />
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
