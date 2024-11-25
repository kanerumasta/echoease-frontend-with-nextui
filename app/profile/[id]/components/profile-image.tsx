import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";

import CustomImage from "@/components/image";

export const ProfileImage = ({ imageSrc }: { imageSrc: string }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <CustomImage
        className="rounded-full"
        height="200px"
        src={imageSrc}
        width="200px"
        onPress={onOpen}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            <CustomImage
              className="rounded-md"
              height="500px"
              src={imageSrc}
              width="500px"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
