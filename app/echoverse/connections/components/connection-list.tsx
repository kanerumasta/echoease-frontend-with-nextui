'use client'

import { useFetchMyConnectionsQuery } from "@/redux/features/artistApiSlice";
import { ArtistConnectionBar } from "./connection-bar";


export const ArtistConnectionList = () => {
const {data:myConnections} = useFetchMyConnectionsQuery()

return <div className="space-y-2">
    {myConnections?.connections.map(artist=>(
        <ArtistConnectionBar artist={artist}/>
    ))}
</div>
}
