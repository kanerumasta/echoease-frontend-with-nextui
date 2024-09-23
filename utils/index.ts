import continueWithSocialAuth from "./continue-with-social-auth";
import { ChatSchema } from "@/schemas/chat-schemas";
import { UserSchema } from "@/schemas/user-schemas";
import { z } from "zod";

export const continueWithGoogle = () =>
    continueWithSocialAuth("google", "google-oauth2");
export const continueWithFacebook = () =>
    continueWithSocialAuth("facebook", "facebook");



export function getChatPartner(
    chat: z.infer<typeof ChatSchema>,
    currentUser: z.infer<typeof UserSchema> | null
  ):z.infer<typeof UserSchema>|null {
    if (currentUser) {
      const filteredParticipants = chat.participants.filter(
        (participant) => participant.email !== currentUser.email
      );
      return filteredParticipants[0]
    }
    return null;
  }