"use client";
import { cn } from "@/lib/utils";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import {
  useFetchChatByCodeQuery,
  useFetchMessagesQuery,
} from "@/redux/features/chatApiSlice";
import { ChatSchema, MessageSchema } from "@/schemas/chat-schemas";
import { UserSchema } from "@/schemas/user-schemas";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { useParams } from "next/navigation";
import { MdSend } from "react-icons/md";
import { z } from "zod";
import { filterConversationParticipants } from "../util-func";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Spacer } from "@nextui-org/spacer";
import { toast } from "react-toastify";

//Declare that participants is many but assumes that only one, thats why we get the first one only
const Header = ({
  conversation,
}: {
  conversation: z.infer<typeof ChatSchema> | null;
}) => {
  return (
    <h1 className="capitalize text-2xl bg-white/30 h-12 w-full flex items-center px-4">
      {conversation ? (
        `${conversation.participants[0].first_name} ${conversation.participants[0].last_name}`
      ) : (
        <Spinner />
      )}
    </h1>
  );
};

const Body = ({
  messages,
  currentUser,
}: {
  messages: z.infer<typeof MessageSchema>[];
  currentUser: z.infer<typeof UserSchema>;
}) => {
  const scrollToBottom = (container: HTMLDivElement) => {
    container?.lastElementChild?.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollToBottom(scrollRef.current);
    }
  }, [messages]);

  return (
    <div className="bg-white/10 p-4 flex-1 overflow-y-scroll">
      {messages.map((msg) => (
        <div
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
    </div>
  );
};

const SendInput = ({
  onChange,
  onHandleSend,
  value,
}: {
  onChange: Dispatch<SetStateAction<string>>;
  onHandleSend: any;
  value: string;
}) => {
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
          onClick={() => {
            onHandleSend();
          }}
        />
      }
    />
  );
};

export default function MessagePage() {
  const [messages, setMessages] = useState<
    z.infer<typeof MessageSchema>[] | []
  >([]);
  const { data: currentUser, isLoading: isUserLoading } =
    useFetchCurrentUserQuery();
  const [filteredConversation, setFilteredConversation] = useState<z.infer<
    typeof ChatSchema
  > | null>(null);
  const params = useParams<{ code: string }>();
  const {
    data: dataMessages,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    isSuccess: isMessagesSuccess,
  } = useFetchMessagesQuery(params.code);
  const {
    data: conversation,
    isLoading: isConversationLoading,
    isError: isConversationError,
  } = useFetchChatByCodeQuery(params.code);
  useEffect(() => {
    if (conversation && currentUser) {
      const f = filterConversationParticipants(conversation, currentUser.email);
      setFilteredConversation(f);
    } else {
      setFilteredConversation(null);
    }
  }, [conversation, currentUser]);

  const websocketURL = `${process.env.NEXT_PUBLIC_CHAT_WEBSOCKET}/${params.code}`;
  const websocket = useRef<WebSocket | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSend = () => {
    websocket.current && websocket.current.send(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (isMessagesSuccess) {
      setMessages(dataMessages);
    }
  }, [isMessagesSuccess]);

  useEffect(() => {
    const socket = new WebSocket(websocketURL);
    socket.onopen = () => {
      toast.success("Connected..");
    };
    socket.onclose = () => console.log("Socket Disconnected..");
    socket.onmessage = (event) => {
      try {
        const newMessage = MessageSchema.safeParse(JSON.parse(event.data));
        if (newMessage.success) {
          setMessages((prevMessages) => [...prevMessages, newMessage.data]);
        } else {
          console.log("Error parsing message | Zod");
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    websocket.current = socket;

    return () => socket.close();
  }, [websocketURL]);

  return (
    <div className="w-full flex flex-col h-[80vh]">
      <Header conversation={filteredConversation} />

      {isMessagesLoading && (
        <div className="flex-1 flex items-center justify-center">
          <Spinner color="primary" className="" />
        </div>
      )}
      {currentUser && <Body messages={messages} currentUser={currentUser} />}
      <SendInput
        value={newMessage}
        onChange={setNewMessage}
        onHandleSend={handleSend}
      />
    </div>
  );
}
