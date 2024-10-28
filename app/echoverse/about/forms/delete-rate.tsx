import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import { z } from "zod";

import { RateSchema } from "@/schemas/artist-schemas";
import { useDeleteArtistRateMutation } from "@/redux/features/artistApiSlice";
import { DeleteIcon } from "@/components/icons/delete";

export const DeleteRate = ({ rate }: { rate: z.infer<typeof RateSchema> }) => {
  const [deleteArtist] = useDeleteArtistRateMutation();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const deleteRate = async () => {
    await deleteArtist(rate.id.toString());
    onClose();
  };

  return (
    <>
      <Tooltip color="danger" content="Delete Rate" delay={1000}>
        <Button isIconOnly color="danger" variant="flat" onPress={onOpen}>
          <DeleteIcon className="text-lg" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Delete Rate</ModalHeader>
          <ModalBody>
            <h1>Do you want to delete this rate?</h1>
            <p className="text-xs text-white/40">
              This action cannot be undone
            </p>
          </ModalBody>
          <ModalFooter>
            <Button radius="sm" variant="bordered" onPress={onClose}>
              No
            </Button>
            <Button
              color="danger"
              radius="sm"
              variant="bordered"
              onPress={deleteRate}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
