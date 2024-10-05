'use client';

import { useFetchMyConnectionsQuery } from "@/redux/features/artistApiSlice";
import { ArtistConnectionList } from "./components/connection-list";
import useLoginRequired from "@/hooks/use-login-required";
import useIsArtistOnly from "@/hooks/use-is-artist-only";
import { notFound } from "next/navigation";

export default function ConnectionsPage() {
    const { loginChecked } = useLoginRequired("/echoverse");
    const { isArtist, isLoading: artistLoading, isError } = useIsArtistOnly();

    // login and isArtist checking
    if (!loginChecked || artistLoading) {
        return <div>Loading...</div>;
    }

    if (!artistLoading && !isArtist) {
        return notFound();
    }
    return (
        <div>
            connections
            <ArtistConnectionList />
        </div>
    );
    return <div>

    </div>
}
