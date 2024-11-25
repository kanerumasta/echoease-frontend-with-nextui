import { z } from "zod";

import {
  ChatDetailSchema,
  ChatSchema,
  MessageSchema,
} from "@/schemas/chat-schemas";

import { apiSlice } from "../services/apiSlice";

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchChats: builder.query<z.infer<typeof ChatSchema>[], void>({
      query: () => "/chat/conversations",
    }),
    fetchBlockedChats: builder.query<z.infer<typeof ChatSchema>[], void>({
      query: () => "/chat/blocked-conversations",
      providesTags: ["BlockedChats"],
    }),
    fetchChatByCode: builder.query<
      z.infer<typeof ChatDetailSchema>,
      { code: string; page: number }
    >({
      query: (data) => `/chat/${data.code}?page=${data.page}`,
    }),
    fetchChatBySlug: builder.query<z.infer<typeof ChatSchema>, string>({
      query: (slug) => `/chat/slug/${slug}`,
    }),
    fetchConversationDetail: builder.query<z.infer<typeof ChatSchema>, string>({
      query: (code) => `/chat/conversations/${code}`,
    }),
    deleteConversation: builder.mutation<z.infer<typeof ChatSchema>, string>({
      query: (code) => ({
        url: `/chat/conversations/${code}`,
        method: "DELETE",
      }),
    }),
    fetchUnreadMessagesCount: builder.query<
      { unread_messages_count: number },
      void
    >({
      query: () => `/chat/unread-messages-count`,
    }),
    markConversationRead: builder.mutation<any, string>({
      query: (code) => ({
        url: `/chat/conversations/${code}/read`,
        method: "POST",
      }),
    }),
    blockAChat: builder.mutation<
      any,
      { conversation_code: string; user_id: number }
    >({
      query: (data) => ({
        url: `/chat/blocked-conversations/${data.conversation_code}/${data.user_id}`,
        method: "POST",
      }),
      invalidatesTags: ["BlockedChats"],
    }),
    unblockChat: builder.mutation<
      any,
      { conversation_code: string; user_id: number }
    >({
      query: (data) => ({
        url: `/chat/unblock-conversation`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BlockedChats"],
    }),
    chatAdmin: builder.mutation<
      z.infer<typeof MessageSchema>,
      { content: string }
    >({
      query: (data) => ({
        url: `/chat/admin-chat/`,
        method: "POST",
        body: data,
      }),
    }),
    fetchAdminChats: builder.query<z.infer<typeof ChatDetailSchema>, void>({
      query: () => `/chat/admin-chat/`,
    }),
  }),
});

export const {
  useFetchChatsQuery,
  useFetchChatByCodeQuery,
  useFetchChatBySlugQuery,
  useFetchConversationDetailQuery,
  useFetchUnreadMessagesCountQuery,
  useMarkConversationReadMutation,
  useDeleteConversationMutation,
  useFetchBlockedChatsQuery,
  useUnblockChatMutation,
  useBlockAChatMutation,
  useChatAdminMutation,
  useFetchAdminChatsQuery,
} = chatApiSlice;
