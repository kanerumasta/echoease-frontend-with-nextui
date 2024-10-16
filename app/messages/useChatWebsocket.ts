import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { MessageSchema } from "@/schemas/chat-schemas";

export const useChatWebSocket = (websocketURL: string, setMessages: Dispatch<SetStateAction<z.infer<typeof MessageSchema>[]>>) => {
  const websocket = useRef<WebSocket | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket(websocketURL);

    socket.onopen = () => {
     console.log('connected')
    };

    socket.onclose = () => {
     console.log('disconnected')
    };

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      // Append new message while keeping the order
      setMessages((prevMessages) => [...prevMessages, messageData]);
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
