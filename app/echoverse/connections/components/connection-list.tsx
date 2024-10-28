"use client";

import { User } from "@nextui-org/user";

import { EmptyList } from "@/components/empty-list";
import { useFetchMyConnectionsQuery } from "@/redux/features/artistApiSlice";

export const ArtistConnectionList = () => {
  const { data: myConnections } = useFetchMyConnectionsQuery();

  return (
    <div className="flex flex-col space-y-2 min-h-[400px] max-h-[400px] md:max-w-[400px] overflow-y-scroll scrollbar-hide ">
      {myConnections && myConnections?.connections.length <= 0 && (
        <EmptyList message="No Connections Yet" />
      )}
      {myConnections?.connections.map((artist) => (
        <User
          avatarProps={{
            src: `${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`,
            size: "md",
          }}
          classNames={{
            base: "justify-start py-2 rounded-full px-4 ",
            name: "text-md capitalize",
          }}
          description={"Echoee"}
          name={artist.user.fullname}
        />
      ))}
    </div>
  );
};
