"use client";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { useParams } from "next/navigation";
import { MdSend } from "react-icons/md";
import { z } from "zod";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";

import { UserSchema } from "@/schemas/user-schemas";
import { MessageSchema } from "@/schemas/chat-schemas";
import {
  useFetchChatByCodeQuery,
  useFetchChatsQuery,
  useFetchConversationDetailQuery,
  useFetchUnreadMessagesCountQuery,
  useMarkConversationReadMutation,
} from "@/redux/features/chatApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { cn } from "@/lib/utils";

import { useChatWebSocket } from "../useChatWebsocket";

import { DeleteConversation } from "./components/delete-conversation";

export default function MessagePage() {
  const [messages, setMessages] = useState<z.infer<typeof MessageSchema>[]>([]);
  const [page, setPage] = useState(1);
  const { data: currentUser } = useFetchCurrentUserQuery();
  const { refetch: refetchChats } = useFetchChatsQuery();
  const { refetch: refetchCount } = useFetchUnreadMessagesCountQuery();
  const params = useParams<{ code: string }>();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { data: conversation, isLoading: isConversationLoading, refetch:refetchChatsCode } =
    useFetchChatByCodeQuery({
      code: params.code,
      page: page,
    },{
        refetchOnMountOrArgChange:true,


    });
  const { data: convDetail, refetch:refetchConvDetail } = useFetchConversationDetailQuery(params.code);
  const [markConversationRead] = useMarkConversationReadMutation();

  const websocketURL = `${process.env.NEXT_PUBLIC_CHAT_WEBSOCKET}/${params.code}`;
  const { newMessage, setNewMessage, sendMessage } = useChatWebSocket(
    params.code,
    websocketURL,
    setMessages,
  );
  
   // Refetch conversation and details on first mount
   useEffect(() => {
    const fetchData = async () => {
      await Promise.all([refetchChatsCode(), refetchConvDetail()]);
    };

    fetchData();
  }, [refetchChatsCode, refetchConvDetail]);


  useEffect(() => {
    if (conversation) {

      // Prepend new messages but maintain order
      setMessages((prevMessages) => [
        ...conversation.messages,
        ...prevMessages,
      ]);
      refetchChats();
      scrollToTop();
    }
  }, [conversation]);

  // Scroll to top when loading previous messages
  useEffect(() => {
    if (page > 1 && conversation) {
      scrollToTop();
    }
  }, [page, conversation]);
  useEffect(() => {
    const markRead = async () => {
      await markConversationRead(params.code);
      refetchCount();
      refetchChats();
    };

    markRead();
  }, []);

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
      <div className="min-h-14 bg-white/10 flex items-center px-2 justify-between">
        {convDetail && (
          <User
            avatarProps={{ src: convDetail?.partner.profile?.profile_image }}
            description={convDetail?.partner.role}
            name={convDetail?.partner.fullname}
          />
        )}
        {convDetail && <DeleteConversation conversation={convDetail} />}
      </div>

      <div
        ref={scrollRef}
        className={cn("min-h-[70vh] max-h-[70vh] overflow-y-scroll px-4", {
          "flex items-center justify-center": isConversationLoading,
        })}
      >
        {isConversationLoading && <Spinner color="primary" />}
        <div className="w-full flex justify-center py-3">
          <Button
            isDisabled={!conversation?.has_next}
            variant="light"
            onPress={() =>
              conversation?.has_next && setPage((prev) => prev + 1)
            }
          >
            {conversation?.has_next
              ? "Load Previous Messages"
              : "No more previous messages"}
          </Button>
        </div>
        {currentUser && <Body currentUser={currentUser} messages={messages} />}
      </div>
      <SendInput
        value={newMessage}
        onChange={setNewMessage}
        onHandleSend={handleSendMessage}
      />
    </div>
  );
}

const Body = ({
  messages,
  currentUser,
}: {
  messages: z.infer<typeof MessageSchema>[];
  currentUser: z.infer<typeof UserSchema>;
}) => {
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
              <p className="bg-blue-700 max-w-[40%] p-2 rounded-md">
                {msg.content}
              </p>
              <Spacer x={2} />
              <Avatar />
            </Fragment>
          ) : (
            <Fragment>
              <Avatar />
              <Spacer x={2} />
              <p className="dark:bg-white/30 bg-black/50 max-w-[40%] p-2 rounded-md">
                {msg.content}
              </p>
            </Fragment>
          )}
        </div>
      ))}
      <div className="h-14" />
    </div>
  );
};

const SendInput = ({
  value,
  onChange,
  onHandleSend,
}: {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onHandleSend: any;
}) => {
  return (
    <Input
      className="self-end"
      endContent={
        <MdSend
          className="cursor-pointer"
          color="#2f9fe1"
          size={30}
          onClick={onHandleSend}
        />
      }
      placeholder="Type your message here..."
      radius="none"
      size="lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
