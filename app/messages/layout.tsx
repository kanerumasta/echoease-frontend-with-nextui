"use client";

import { SearchIcon } from "@/components/icons";
import { useFetchChatsQuery } from "@/redux/features/chatApiSlice";
import { ChatSchema } from "@/schemas/chat-schemas";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { z } from "zod";
import { UserSchema } from "@/schemas/user-schemas";
import { Avatar } from "@nextui-org/avatar";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import MainLayout from "@/components/main-layout";
import useLoginRequired from "@/hooks/use-login-required";
import EchoLoading from "@/components/echo-loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
  return (
    <div className="pr-2">
      <Input
      onClear={()=>onSearch("")}
      isClearable
        size="lg"
        startContent={<SearchIcon />}
        placeholder="Search in messages.."
        onChange={(e) => onSearch(e.target.value)}
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
          onClick={() => router.push(`/messages/${conv.code}`)}
          className="flex cursor-pointer hover:bg-black/10 transition duration-300 ease-out dark:hover:bg-white/10 p-2 items-center space-x-2 capitalize"
          key={conv.code}
        >
          <Avatar
            src={`${process.env.NEXT_PUBLIC_HOST}${conv.partner?.profile?.profile_image}`}
          />
          <p>
            {conv.partner.fullname}
          </p>
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
  const { data: conversations = [], isLoading: isConversationsLoading } = useFetchChatsQuery();
  const { data: currentUser, isLoading: iscurrentUserLoading } = useFetchCurrentUserQuery();
  const [searchQuery, setSearchQuery] = useState("");

  if (isConversationsLoading) {
    return <EchoLoading />;
  }

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conv) =>
    conv.partner.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex bg-gradient-to-br from-blue-500/40 to-purple-600/20 p-2 rounded-lg">
        <div className="min-w-[300px]">
          <h1 className="text-2xl font-semibold">Messages</h1>
          {/* SEARCH */}
          <Spacer y={6} />
          <SearchInput onSearch={setSearchQuery} />
          <Spacer y={4} />
          <p className="p-1 dark:text-white/20 text-black/20 text-xs">
            {filteredConversations.length} conversations
          </p>
          <div className="max-h-[460px] overflow-y-scroll scrollbar-hide">
            {filteredConversations.length > 0 && currentUser && (
              <MessagesList conversations={filteredConversations} />
            )}
          </div>
        </div>
        {filteredConversations.length > 0 ? (
          children
        ) : (
          <div className="min-h-[70vh] rounded-lg bg-black/50 w-full flex items-center justify-center ">
            Your messages are empty.
          </div>
        )}
      </div>
    </MainLayout>
  );
}
