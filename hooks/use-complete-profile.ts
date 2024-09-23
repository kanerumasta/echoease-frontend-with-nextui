"use client";

import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLoginRequired from "./use-login-required";

export default function useCompleteProfile(redirect: string) {
  const {
    data: currentUser,
    isLoading: currentUserLoading,
    isError: currentUserError,
  } = useFetchCurrentUserQuery();
  useLoginRequired(redirect);
  const router = useRouter();

  useEffect(() => {
    if (currentUser)
      if (!currentUser?.profile?.is_complete)
        router.push(
          `/auth/register/profile?redirect=${encodeURIComponent(redirect)}`
        );
  }, [currentUser]);
}
