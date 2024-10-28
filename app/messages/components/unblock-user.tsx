"use client";

import { Button } from "@nextui-org/button";
import { z } from "zod";

import {
  useFetchChatsQuery,
  useUnblockChatMutation,
} from "@/redux/features/chatApiSlice";
import { ChatSchema } from "@/schemas/chat-schemas";

export const UnblockUser = ({
  conversation,
}: {
  conversation: z.infer<typeof ChatSchema>;
}) => {
  const [unblockChat, { isLoading }] = useUnblockChatMutation();
  const { refetch: refetchChats } = useFetchChatsQuery();
  const handleUnblockChat = async () => {
    const conversationCode = conversation.code;
    const userId = conversation.partner.id;
    const payload = {
      conversation_code: conversationCode,
      user_id: userId,
    };

    await unblockChat(payload);
    refetchChats();
  };

  return (
    <>
      <Button
        color="warning"
        isLoading={isLoading}
        radius="sm"
        onPress={handleUnblockChat}
      >
        Unblock
      </Button>
    </>
  );
};
