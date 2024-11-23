"use client";

import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { z } from "zod";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { SearchIcon } from "@/components/icons";
import { useFetchChatsQuery } from "@/redux/features/chatApiSlice";
import { ChatSchema } from "@/schemas/chat-schemas";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import MainLayout from "@/components/main-layout";
import useLoginRequired from "@/hooks/use-login-required";
import EchoLoading from "@/components/echo-loading";
import { cn } from "@/lib/utils";

import { BlockedUsers } from "./components/blocked-users";

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
  return (
    <div className="pr-2">
      <Input
        isClearable
        placeholder="Search in messages.."
        size="lg"
        startContent={<SearchIcon />}
        onChange={(e) => onSearch(e.target.value)}
        onClear={() => onSearch("")}
      />
    </div>
  );
};

const MessagesList = ({
  conversations,
}: {
  conversations: z.infer<typeof ChatSchema>[] | [];
}) => {
  const router = useRouter();


  return (
    <ul className="">
      {conversations.map((conv) => (
        <li
          key={conv.code}
          className={cn(
            "flex cursor-pointer hover:bg-black/10 text-sm text-white/50 transition duration-300 ease-out dark:hover:bg-white/10 p-2 items-center space-x-2 capitalize",
            { "text-white text-lg": conv.unread_messages_count > 0 },
          )}
          onClick={() => router.push(`/messages/${conv.code}`)}
        >

          <Avatar src={conv.partner?.profile?.profile_image} />
          <div className=" flex-1">
            <div className="flex justify-between items-center">
          <p className="text-md text-white/80">{conv.partner.fullname}</p>
          <p className="text-[10px] text-white/30">{conv.last_message_time}</p>
            </div>
            <p className="text-[10px] text-white/40">{conv.last_message.slice(0,20)}{conv.last_message.length > 20 && '...'}</p>
          </div>

        </li>
      ))}
    </ul>
  );
};

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useLoginRequired("/messages");
  const { data: conversations = [], isLoading: isConversationsLoading } =
    useFetchChatsQuery();
  const { data: currentUser, isLoading: iscurrentUserLoading } =
    useFetchCurrentUserQuery();
  const [searchQuery, setSearchQuery] = useState("");

  if (isConversationsLoading) {
    return <EchoLoading />;
  }

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conv) =>
      conv &&
      conv.partner &&
      conv.partner.fullname.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="flex bg-gradient-to-br from-blue-500/40 min-h-[80vh] to-purple-600/20 p-2 rounded-lg">
        <div className="min-w-[300px]">
          <h1 className="text-2xl font-semibold">Messages</h1>
          {/* SEARCH */}
          <Spacer y={6} />
          <SearchInput onSearch={setSearchQuery} />
          <Spacer y={4} />
          <div className="flex items-center justify-between">
            <p className="p-1 dark:text-white/20 text-black/20 text-xs">
              {filteredConversations.length} conversations
            </p>
            <BlockedUsers />
          </div>
          <div className="max-h-[460px] overflow-y-scroll scrollbar-hide">
            {filteredConversations.length > 0 && currentUser && (
              <MessagesList conversations={filteredConversations} />
            )}
          </div>
        </div>
        {children}
      </div>
    </MainLayout>
  );
}
