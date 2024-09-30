"use client";

import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useEffect, useState } from "react";

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
