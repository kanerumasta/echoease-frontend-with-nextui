"use client";

import { Suspense } from "react";

import { useSocialAuth } from "@/hooks/auth";

export default function Page() {
  useSocialAuth("google-oauth2", "Google");

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div>Logging you in to echoease...</div>;
    </Suspense>
  );
}
