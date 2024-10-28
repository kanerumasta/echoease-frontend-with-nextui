import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { z } from "zod";

import { MessageSchema } from "@/schemas/chat-schemas";
import {
  useFetchUnreadMessagesCountQuery,
  useMarkConversationReadMutation,
} from "@/redux/features/chatApiSlice";

export const useChatWebSocket = (
  code: string,
  websocketURL: string,
  setMessages: Dispatch<SetStateAction<z.infer<typeof MessageSchema>[]>>,
) => {
  const websocket = useRef<WebSocket | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const { refetch: refetchUnread } = useFetchUnreadMessagesCountQuery();
  const [markConversationRead] = useMarkConversationReadMutation();

  useEffect(() => {
    const socket = new WebSocket(websocketURL);

    socket.onopen = () => {
      console.log("connected");
    };

    socket.onclose = () => {
      console.log("disconnected");
    };

    socket.onmessage = async (event) => {
      const messageData = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, messageData]);
      //   if(window.location.pathname.includes('/messages/')){
      //     await markConversationRead(code)
      //   }
      //   refetchUnread()
    };

    websocket.current = socket;

    return () => {
      socket.close();
    };
  }, [websocketURL, setMessages]);

  const sendMessage = () => {
    if (websocket.current && newMessage.trim()) {
      websocket.current.send(newMessage);
      setNewMessage("");
    }
  };

  return { newMessage, setNewMessage, sendMessage };
};
