import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

import CustomImage from "@/components/image";
import { useFetchArtistConnectionsQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";

function Connections({ artistId }: { artistId: number }) {
  const { data: artistConnections } = useFetchArtistConnectionsQuery(artistId);

  return (
    <div>
        {artistConnections && artistConnections?.connections.length > 0 &&<>
      <h1 className="text-center mb-4 text-2xl font-bold tracking-wider text-blue-400">
        Connections
      </h1>
      <div className="px-4 mb-12 flex gap-2 overflow-x-scroll">
        {artistConnections &&
          artistConnections?.connections.map((connection) => (
            <EchoeeCard echoee={connection} />
          ))}
      </div>
      </>}
    </div>
  );
}

export default Connections;

const EchoeeCard = ({ echoee }: { echoee: z.infer<typeof ArtistInSchema> }) => {
  const router = useRouter();

  return (
    <div className="max-w-[150px] min-w-[150px] min-h-[150px] p-2 bg-white/10 rounded-md">
      <div
        className=" overflow-hidden rounded-md cursor-pointer"
        onClick={() => router.push(`/${echoee.slug}`)}
      >
        <div className="overflow-hidden rounded-md">
          {echoee.user.profile && (
            <CustomImage
              className="hover:scale-110 duration-500 transition-all"
              height="120px"
              src={`${process.env.NEXT_PUBLIC_HOST}${echoee.user.profile?.profile_image}`}
              width="100%"
            />
          )}
        </div>
        <div className="capitalize py-2 text-white/70 font-bold text-sm">
          <p>{echoee.stage_name ? echoee.stage_name : echoee.user.fullname}</p>
        </div>
      </div>
    </div>
  );
};
