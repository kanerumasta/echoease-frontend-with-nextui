"use client";

import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useLoginRequired(redirect: string) {
  const router = useRouter();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    isFetching,
  } = useFetchCurrentUserQuery();

  useEffect(() => {
    if (isUserError) {
      window.location.href = `/auth/login/?redirect=${encodeURIComponent(`${redirect}`)}`;
    }
  }, [isUserError, router]);

  return { isUserLoading };
}
