"use client";

import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoginRequired from "./use-login-required";

export default function useCompleteProfile(redirect: string) {
  const {
    data: currentUser,
    isLoading: currentUserLoading,
    isError: currentUserError,
  } = useFetchCurrentUserQuery();
  //be true when done checking login and if profile is complete
  const [profileChecked, setProfileChecked] = useState(false)


  const {loginChecked, isError} =useLoginRequired(redirect);
  const router = useRouter();

  useEffect(() => {
    if (currentUser && loginChecked){
      if (!currentUser?.profile?.is_complete){
        router.push(
          `/auth/register/profile?redirect=${encodeURIComponent(redirect)}`
        );
    }else{
        setProfileChecked(true)
    }
    }
  }, [currentUser,loginChecked]);

  return {
    profileChecked,
    isError,
  }
}
