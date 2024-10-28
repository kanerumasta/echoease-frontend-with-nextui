"use client";
import { BsPersonFillSlash } from "react-icons/bs";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { User } from "@nextui-org/user";

import { useFetchBlockedChatsQuery } from "@/redux/features/chatApiSlice";

import { UnblockUser } from "./unblock-user";

export const BlockedUsers = () => {
  const { data: blockedConversations } = useFetchBlockedChatsQuery();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button isIconOnly radius="full" variant="light" onPress={onOpen}>
        <BsPersonFillSlash className="text-white/50" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center gap-2">
              <BsPersonFillSlash className="text-red-500" />
              <p>Blocked Users</p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div>
              {blockedConversations?.map((conversation) => (
                <div
                  key={conversation.code}
                  className="flex items-center justify-between mb-3"
                >
                  <User
                    avatarProps={{
                      src: conversation.partner.profile?.profile_image,
                    }}
                    name={conversation.partner.fullname}
                  />
                  <UnblockUser conversation={conversation} />
                </div>
              ))}
            </div>
            {blockedConversations && blockedConversations.length <= 0 && (
              <div className="p-12 text-white/50 flex justify-center ">
                No Blocked Users
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
