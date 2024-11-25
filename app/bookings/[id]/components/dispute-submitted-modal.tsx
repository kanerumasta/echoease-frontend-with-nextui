"use client";

import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { IoCheckmark } from "react-icons/io5";

type DisputeSubmittedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DisputeSubmittedModal: React.FC<DisputeSubmittedModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <p className="text-xl flex items-center gap-2">
            Dispute Submitted
            <IoCheckmark className="text-[#f31260]" />
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-2">
            <p className="text-lg">Thank you for submitting your dispute.</p>
            <p>
              We understand the importance of your concern and will do our
              utmost to resolve the issue as quickly as possible.
            </p>
            <p>
              You will receive updates regarding the status of your dispute. If
              you have any further questions, please do not hesitate to reach
              out.
            </p>
          </div>
        </ModalBody>
        <div className="flex justify-end p-4">
          <Button radius="sm" onPress={onClose}>
            Close
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DisputeSubmittedModal;
