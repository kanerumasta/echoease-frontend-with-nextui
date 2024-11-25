"use client";

import { useEffect, useState } from "react";

import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";

export default function useIsArtistOnly() {
  const { data, isLoading, isError } = useFetchCurrentUserQuery();
  const [isArtist, setIsArtist] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setIsArtist(data?.role === "artist");
    }
  }, [isLoading, isError, data]);

  return { isArtist, isLoading, isError };
}
