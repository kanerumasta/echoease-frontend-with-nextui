"use client";
import { cn } from "@/lib/utils";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useFetchChatByCodeQuery, useFetchConversationDetailQuery } from "@/redux/features/chatApiSlice";
import { ChatSchema, MessageSchema } from "@/schemas/chat-schemas";
import { UserSchema } from "@/schemas/user-schemas";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { useParams } from "next/navigation";
import { MdSend } from "react-icons/md";
import { z } from "zod";
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import { Spacer } from "@nextui-org/spacer";
import { useChatWebSocket } from "../useChatWebsocket";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";

export default function MessagePage() {
  const [messages, setMessages] = useState<z.infer<typeof MessageSchema>[]>([]);
  const [page, setPage] = useState(1);
  const { data: currentUser } = useFetchCurrentUserQuery();
  const params = useParams<{ code: string }>();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { data: conversation, isLoading: isConversationLoading } = useFetchChatByCodeQuery({
    code: params.code,
    page: page,
  });
  const {data:convDetail} = useFetchConversationDetailQuery(params.code)

  const websocketURL = `${process.env.NEXT_PUBLIC_CHAT_WEBSOCKET}/${params.code}`;
  const { newMessage, setNewMessage, sendMessage } = useChatWebSocket(websocketURL, setMessages);

  useEffect(() => {
    if (conversation) {
      // Prepend new messages but maintain order
      setMessages((prevMessages) => [...conversation.messages, ...prevMessages]);
      scrollToTop();
    }
  }, [conversation]);

  // Scroll to top when loading previous messages
  useEffect(() => {
    if (page > 1 && conversation) {
      scrollToTop();
    }
  }, [page, conversation]);

  // Scroll to bottom when sending a message
  const handleSendMessage = () => {
    sendMessage();
    scrollToBottom();
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex flex-col bg-black/50 rounded-lg overflow-hidden">
      <div className="min-h-14 bg-white/10 flex items-center px-2">
      <User name={convDetail?.partner.fullname} description={convDetail?.partner.role} avatarProps={{src:`${process.env.NEXT_PUBLIC_HOST}${convDetail?.partner.profile?.profile_image}`}}/>
      </div>

      <div
        ref={scrollRef}
        className={cn("min-h-[70vh] max-h-[70vh] overflow-y-scroll px-4", {
          "flex items-center justify-center": isConversationLoading,
        })}
      >
        {isConversationLoading && <Spinner color="primary" />}
        <div className="w-full flex justify-center py-3">
        <Button isDisabled={!conversation?.has_next} variant="light" onPress={() => conversation?.has_next && setPage((prev) => prev + 1)}>
          {conversation?.has_next ? "Load Previous Messages" : "No more previous messages"}
        </Button>
        </div>
        {currentUser && <Body messages={messages} currentUser={currentUser} />}
      </div>
      <SendInput value={newMessage} onChange={setNewMessage} onHandleSend={handleSendMessage} />
    </div>
  );
}

const Body = ({ messages, currentUser }: { messages: z.infer<typeof MessageSchema>[]; currentUser: z.infer<typeof UserSchema> }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div ref={scrollRef} className="">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={cn("flex my-4", {
            "justify-end": msg.author === currentUser.email,
          })}
        >
          {msg.author === currentUser.email ? (
            <Fragment>
              <p className="bg-blue-700 max-w-[40%] p-2 rounded-md">{msg.content}</p>
              <Spacer x={2} />
              <Avatar />
            </Fragment>
          ) : (
            <Fragment>
              <Avatar />
              <Spacer x={2} />
              <p className="dark:bg-white/30 bg-black/50 max-w-[40%] p-2 rounded-md">{msg.content}</p>
            </Fragment>
          )}
        </div>
      ))}
      <div className="h-14"></div>
    </div>
  );
};

const SendInput = ({ value, onChange, onHandleSend }: { value: string; onChange: Dispatch<SetStateAction<string>>; onHandleSend: any }) => {
  return (
    <Input
      size="lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      radius="none"
      className="self-end"
      placeholder="Type your message here..."
      endContent={
        <MdSend
          className="cursor-pointer"
          size={30}
          color="#2f9fe1"
          onClick={onHandleSend}
        />
      }
    />
  );
};
