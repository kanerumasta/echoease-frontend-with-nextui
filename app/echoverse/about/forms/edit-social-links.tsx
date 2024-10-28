"use client";

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
import { useForm } from "react-hook-form";
import {
  FaFacebook,
  FaInstagram,
  FaSpotify,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { z } from "zod";

import { useUpdateArtistMutation } from "@/redux/features/artistApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { EditIcon } from "@/components/icons/edit";

const SocialSchema = z.object({
  fb_link: z.string(),
  instagram: z.string(),
  youtube: z.string(),
  spotify: z.string(),
  twitter: z.string(),
});

export const EditSocialLinks = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const { register, handleSubmit, reset } = useForm<
    z.infer<typeof SocialSchema>
  >({ resolver: zodResolver(SocialSchema) });
  const [updateArtist, { isLoading }] = useUpdateArtistMutation();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const onSubmit = async (data: z.infer<typeof SocialSchema>) => {
    const formData = new FormData();

    data.fb_link && formData.append("fb_link", data.fb_link);
    data.youtube && formData.append("youtube", data.youtube);
    data.instagram && formData.append("instagram", data.instagram);
    data.twitter && formData.append("twitter", data.twitter);
    data.spotify && formData.append("spotify", data.spotify);
    formData.append("artist_id", artist.id.toString());

    await updateArtist(formData);
    reset();
    onClose();
  };

  return (
    <>
      <Button
        isIconOnly
        className="absolute top-2 right-2"
        radius="full"
        variant="flat"
        onPress={onOpen}
      >
        <EditIcon className="text-lg" />
      </Button>
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Edit Links</ModalHeader>
          <ModalBody>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Input
                  isClearable
                  defaultValue={artist.fb_link || ""}
                  label={"Facebook Profile"}
                  startContent={<FaFacebook />}
                  {...register("fb_link")}
                />
                <Input
                  isClearable
                  defaultValue={artist.youtube || ""}
                  label={"Youtube"}
                  startContent={<FaYoutube />}
                  {...register("youtube")}
                />
                <Input
                  isClearable
                  defaultValue={artist.spotify || ""}
                  label={"Spotify"}
                  startContent={<FaSpotify />}
                  {...register("spotify")}
                />
                <Input
                  isClearable
                  defaultValue={artist.instagram || ""}
                  label={"Instagram"}
                  startContent={<FaInstagram />}
                  {...register("instagram")}
                />
                <Input
                  isClearable
                  defaultValue={artist.twitter || ""}
                  label={"Twitter"}
                  startContent={<FaTwitter />}
                  {...register("twitter")}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-blue-500"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
