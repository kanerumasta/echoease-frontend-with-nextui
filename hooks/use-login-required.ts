"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";

export default function useLoginRequired(redirect: string) {
  const router = useRouter();

  const [loginChecked, setLoginChecked] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useFetchCurrentUserQuery();

  useEffect(() => {
    if (!isLoading) {
      if (isError || !user) {
        window.location.href = `/auth/login/?redirect=${encodeURIComponent(`${redirect}`)}`;
      } else {
        setLoginChecked(true);
      }
    }
  }, [isError, router, isLoading, redirect]);

  return { loginChecked, isError };
}
