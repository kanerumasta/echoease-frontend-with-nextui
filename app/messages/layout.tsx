"use client";

import { SearchIcon } from "@/components/icons";
import { useFetchChatsQuery } from "@/redux/features/chatApiSlice";
import { ChatSchema } from "@/schemas/chat-schemas";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { z } from "zod";
import { filterConversationParticipants } from "./util-func";
import { UserSchema } from "@/schemas/user-schemas";
import { Avatar } from "@nextui-org/avatar";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { redirect, useRouter } from "next/navigation";
import MainLayout from "@/components/main-layout";
import useLoginRequired from "@/hooks/use-login-required";
import EchoLoading from "@/components/echo-loading";

const ConversationCount = () => {
  return (
    <p className="p-1 dark:text-white/20 text-black/20 text-xs">
      10 conversations
    </p>
  );
};

const SearchInput = () => {
  return (
    <div>
      <Input
        size="lg"
        variant="flat"
        radius="none"
        startContent={<SearchIcon />}
        placeholder="Search in messages.."
      />
    </div>
  );
};

const MessagesList = ({
  conversations,
  currentUser,
}: {
  conversations: z.infer<typeof ChatSchema>[] | [];
  currentUser: z.infer<typeof UserSchema>;
}) => {
  const router = useRouter();

  return (
    <ul className=" dark:bg-white/10 ">
      {conversations?.map((conv) => {
        const filteredConversation = filterConversationParticipants(
          conv,
          currentUser.email
        );
        return (
          <li
            onClick={() => router.push(`/messages/${conv.code}`)}
            className="flex cursor-pointer hover:bg-black/10 transition duration-300 ease-out dark:hover:bg-white/10 p-2 items-center space-x-2 capitalize"
            key={filteredConversation.code}
          >
            <Avatar />
            <p>
              {filteredConversation.participants.map(
                (p) => `${p.first_name} ${p.last_name}`
              )}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useLoginRequired("/messages");
  const { data: conversations, isLoading: isConversationsLoading } =
    useFetchChatsQuery();

  const { data: currentUser, isLoading: iscurrentUserLoading } =
    useFetchCurrentUserQuery();

if(isConversationsLoading){
    return <EchoLoading />
}

  return (
    <MainLayout>
      <div className="flex">
        <div className="min-w-[300px]">
          <h1 className="text-2xl font-semibold">Messages</h1>
          {/* SEARCH */}
          <Spacer y={6} />
          <SearchInput />
          <Spacer y={4} />
          <ConversationCount />
          {conversations && currentUser && (
            <MessagesList
              conversations={conversations}
              currentUser={currentUser}
            />
          )}
        </div>
        {children}
      </div>
    </MainLayout>
  );
}
