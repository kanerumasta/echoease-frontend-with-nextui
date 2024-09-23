import { ChatSchema, MessageSchema } from "@/schemas/chat-schemas";
import { apiSlice } from "../services/apiSlice";
import { z } from "zod";

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    fetchChats: builder.query<z.infer<typeof ChatSchema>[], void>({
      query: () => "/chat/",
    }),
    fetchMessages: builder.query<z.infer<typeof MessageSchema>[], string>({
      query: (code: string) => `/chat/${code}/messages`,
    }),
    fetchChatByCode : builder.query<z.infer<typeof ChatSchema>,string>({
      query : (code:string) => `/chat/${code}`
    }),
    fetchChatBySlug : builder.query<z.infer<typeof ChatSchema>, string>({
      query:(slug)=>`/chat/slug/${slug}`
    }),
  }),
});

export const { useFetchChatsQuery, useFetchMessagesQuery, useFetchChatByCodeQuery, useFetchChatBySlugQuery } = chatApiSlice;
