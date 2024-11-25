"use client";

import { useSocialAuth } from "@/hooks/auth";

export default function Page() {
  useSocialAuth("facebook", "facebook");

  return <div>Logging you in to echoease...</div>;
}
