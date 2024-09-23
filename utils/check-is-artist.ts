"use client"

import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice"

export const useIsCurrentUserAnArtist = ( )=> {
    const {data, isLoading} = useFetchCurrentUserQuery()
    const isArtist = data?.role === "artist"

    return {
        isArtist,
        isLoading
    }
}