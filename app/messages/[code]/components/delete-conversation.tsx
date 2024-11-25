"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { BsPersonSlash } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "react-toastify";
import { z } from "zod";

import { ChatSchema } from "@/schemas/chat-schemas";
import {
  useBlockAChatMutation,
  useDeleteConversationMutation,
  useFetchChatsQuery,
} from "@/redux/features/chatApiSlice";
import { DeleteIcon } from "@/components/icons/delete";

export const DeleteConversation = ({
  conversation,
}: {
  conversation: z.infer<typeof ChatSchema>;
}) => {
  const [deleteConversation, { isLoading }] = useDeleteConversationMutation();

  const [blockAChat, block] = useBlockAChatMutation();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const blockModal = useDisclosure();
  const router = useRouter();
  const { refetch } = useFetchChatsQuery();
  const handleDelete = async () => {
    await deleteConversation(conversation.code);
    toast.success("Conversation deleted successfully");
    refetch(); //refetch chats
    onClose();
    router.replace("/messages");
  };
  const handleBlockUser = async () => {
    const conversationCode = conversation.code;
    const userId = conversation.partner.id;
    const payload = {
      conversation_code: conversationCode,
      user_id: userId,
    };

    await blockAChat(payload);
    refetch(); //refetch Chats
    blockModal.onClose();

    router.replace("/messages");
  };

  return (
    <>
      <Dropdown radius="sm">
        <DropdownTrigger>
          <Button isIconOnly variant="light">
            <HiDotsVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            key={"delete"}
            startContent={<DeleteIcon className="text-red-500" />}
            onClick={onOpen}
          >
            Delete Conversation
          </DropdownItem>
          <DropdownItem
            key={"block"}
            startContent={<BsPersonSlash />}
            onClick={blockModal.onOpen}
          >
            Block User
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            Are you sure you want to delete this conversation?
          </ModalBody>
          <ModalFooter>
            <Button radius="sm" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              isLoading={isLoading}
              radius="sm"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={blockModal.isOpen} onOpenChange={blockModal.onOpenChange}>
        <ModalContent>
          <ModalBody>Are you sure you want to block this user?</ModalBody>
          <ModalFooter>
            <Button radius="sm" onPress={blockModal.onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              isLoading={block.isLoading}
              radius="sm"
              onClick={handleBlockUser}
            >
              Block
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
