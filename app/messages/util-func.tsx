// import { ChatSchema } from "@/schemas/chat-schemas";
// import { z } from "zod";

// //filter out current user from conversation participants
// export function filterConversationParticipants(
//   conversation: z.infer<typeof ChatSchema>,
//   currentUserEmail: string
// ): z.infer<typeof ChatSchema> {
//   const filteredParticipants = conversation.participants.filter(
//     (p) => p.email !== currentUserEmail
//   );

//   return { ...conversation, participants: filteredParticipants };
// }
