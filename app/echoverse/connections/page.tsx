'use client';

import { useFetchMyConnectionsQuery } from "@/redux/features/artistApiSlice";
import { ArtistConnectionList } from "./components/connection-list";
import useLoginRequired from "@/hooks/use-login-required";
import useIsArtistOnly from "@/hooks/use-is-artist-only";
import { notFound } from "next/navigation";
import { Recommendations } from "./components/recommendations";
import { ConnectionRequests } from "../sections/connection-requests";
import { SentConnectionRequests } from "./components/sent-requests";

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
        <div className="flex gap-2">
            <div className="space-y-2">
            <div className="p-3 w-full md:min-w-[400px] md:max-w-[400px] max-h-[365px]  rounded-lg bg-white/10">
                <h2 className="mb-4 text-white/50">Echonnections</h2>
                 <ArtistConnectionList />
             </div>
            <div className="p-3 w-full md:min-w-[400px] md:max-w-[400px] rounded-lg bg-white/10">
                <h2 className="mb-4 text-white/50">Sent Requests</h2>
                 <SentConnectionRequests />
             </div>

             </div>
             <div className="w-full space-y-2">
            <div className="p-3 w-full rounded-lg bg-white/10">
                <h2 className="mb-4 text-white/50">Echoees You May Know</h2>
                <Recommendations />
            </div>
            <div className="p-3 w-full min-h-[300px] rounded-lg bg-white/10">
                <h2 className="mb-4 text-white/50">Requests</h2>
                <ConnectionRequests/>
            </div>
            </div>

        </div>
    );
    return <div>

    </div>
}
