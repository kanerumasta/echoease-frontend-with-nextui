import continueWithSocialAuth from "./continue-with-social-auth";
import { ChatSchema } from "@/schemas/chat-schemas";
import { UserSchema } from "@/schemas/user-schemas";
import { z } from "zod";

export const continueWithGoogle = () =>
    continueWithSocialAuth("google", "google-oauth2");
export const continueWithFacebook = () =>
    continueWithSocialAuth("facebook", "facebook");
