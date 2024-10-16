import { ChatDetailSchema, ChatSchema, MessageSchema } from "@/schemas/chat-schemas";
import { apiSlice } from "../services/apiSlice";
import { z } from "zod";

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    fetchChats: builder.query<z.infer<typeof ChatSchema>[], void>({
      query: () => "/chat/conversations",
    }),
    fetchChatByCode : builder.query<z.infer<typeof ChatDetailSchema>,{code:string, page:number}>({
      query : (data) => `/chat/${data.code}?page=${data.page}`
    }),
    fetchChatBySlug : builder.query<z.infer<typeof ChatSchema>, string>({
      query:(slug)=>`/chat/slug/${slug}`
    }),
    fetchConversationDetail:builder.query<z.infer<typeof ChatSchema>,string>({
        query:(code)=>`/chat/conversations/${code}`
    })
  }),
});

export const { useFetchChatsQuery, useFetchChatByCodeQuery, useFetchChatBySlugQuery ,useFetchConversationDetailQuery} = chatApiSlice;
