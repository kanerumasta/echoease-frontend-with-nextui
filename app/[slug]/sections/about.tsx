"use client";

import { UserRoles } from "@/config/constants";
import {
    useConnectArtistMutation,
    useFetchConnectionRequestsQuery,
    useFetchDetailArtistBySlugQuery,
    useFetchDetailCurrentArtistQuery,
    useFollowArtistMutation,
    useUnfollowArtistMutation,
} from "@/redux/features/artistApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import {
    useFetchChatBySlugQuery,
    useFetchChatsQuery,
} from "@/redux/features/chatApiSlice";
import { useFetchArtistRatingQuery } from "@/redux/features/reviewsApiSlice";
import {
    ArtistInSchema,
    ConnectionRequestSchema,
    RateSchema,
} from "@/schemas/artist-schemas";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Spacer } from "@nextui-org/spacer";
import { animated, useSpring } from "@react-spring/web";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { HiChat } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import { RiUserFollowFill } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import { z } from "zod";
import { Followers } from "../components/followers";
import { Links } from "../components/links";
import { Ratings } from "../components/rating";
import Image from "next/image";

export default function AboutSection({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) {
  const params = useParams<{ slug: string }>();
  const { refetch } = useFetchDetailArtistBySlugQuery(params.slug);
  const { data: connectionRequests, refetch: refetchConnectionRequests } =
    useFetchConnectionRequestsQuery();
  const { data: ratingsData } = useFetchArtistRatingQuery(artist.id);
  const { refetch: refetchChats } = useFetchChatsQuery();
  const { data: currentUser, isLoading } = useFetchCurrentUserQuery();
  const { data: conversation } = useFetchChatBySlugQuery(params.slug);
  const { data: currentUserArtist } = useFetchDetailCurrentArtistQuery();

  const [
    connectArtist,
    {
      isLoading: connectingArtist,
      isError: errorConnectingArtist,
      isSuccess: successConnectingArtist,
    },
  ] = useConnectArtistMutation();

  const [followArtist, { isLoading: followLoading }] =
    useFollowArtistMutation();
  const [unfollowArtist, { isLoading: unfollowLoading }] =
    useUnfollowArtistMutation();

  const router = useRouter();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const style = useSpring({
    opacity: inView ? 1 : 0, // Fade in effect
    transform: inView ? "translateY(0)" : "translateY(100px)", // Slide in effect
    config: { tension: 280, friction: 60 }, // Spring config
  });

  useEffect(() => {
    if (successConnectingArtist) {
      toast.success("Connection request sent.");
      refetchConnectionRequests();
    } else if (errorConnectingArtist) {
      toast.error("Connection request failed. Please try again.");
    }
  }, [successConnectingArtist, errorConnectingArtist, refetchConnectionRequests]);


  const handleFollow = () => {
      const formData = new FormData();

      formData.append("artist", artist.id.toString());
      followArtist(formData)
      .unwrap()
      .then(() => refetch())
      .catch();
    };
    const handleUnfollow = () => {
        const formData = new FormData();

        formData.append("artist", artist.id.toString());
        unfollowArtist(formData)
        .unwrap()
      .then(() => refetch())
      .catch();
    };

    const handleSendArtistConnection = () => {
    const sender = currentUserArtist?.id;
    const receiver = artist.id;

    const payload = {
      sender: sender,
      receiver: receiver,
    };

    connectArtist(payload);
};

const handleMessageMeClick = () => {
    refetchChats();
    router.push(`/messages/${conversation?.code}`);
};

const artistInRequest = (
    connectionRequests: z.infer<typeof ConnectionRequestSchema>[],
    artistId: number,
): boolean => {
    return connectionRequests.some((req) => req.receiver.id === artistId);
};
const artistInConnections = () => {
    return currentUserArtist?.connections.includes(artist.id) || false;
};

if (isLoading) return <div>Loading...</div>;

return (
    <div className="flex gap-4 duration-1000 animate-appearance-in min-h-screen w-full">
      {/* Image Profile */}
      <animated.div
        ref={ref}
        className=" w-full md:w-[80%] min-h-[60%] m-auto flex flex-col lg:flex-row"
        style={style}
      >
        {artist.user.profile && (
          <div className="w-full min-w-[50%] lg:max-w-[50%] ">
            <img
                alt="Echoee Image"
              className="w-full h-full object-cover"
              height={100}
              src={artist.user.profile?.profile_image}
              width={100}

            />
          </div>
        )}
        <div className=" w-full p-6 bg-slate-300/10">
          <p className="text-blue-400 font-bold mb-2">About Me</p>
          <p className="capitalize lg:text-3xl md:text-3xl text-2xl font-bold">{`${artist.user.fullname}`}</p>

          {ratingsData && ratingsData.rating__avg && (
            <Ratings rating={ratingsData.rating__avg} />
          )}
          <Spacer y={2} />

          {artist?.followers?.length > 0 && (
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <Chip
                  className="hover:cursor-pointer"
                  size="sm"
                  variant="light"
                >{`${artist.followers?.length} Follower${artist.followers.length === 1 ? "" : "s"}`}</Chip>
              </PopoverTrigger>
              <PopoverContent>
                <Followers artist={artist} />
              </PopoverContent>
            </Popover>
          )}
          <Spacer y={2} />

          <div className="flex items-center gap-2">
            {currentUser && !artist.followers.includes(currentUser.id) && (
              <Button
                color="primary"
                isLoading={followLoading}
                radius="sm"
                size="sm"
                startContent={<RiUserFollowFill />}
                onPress={handleFollow}
              >
                Follow
              </Button>
            )}
            {currentUser && artist.followers.includes(currentUser.id) && (
              <Button
                isLoading={unfollowLoading}
                radius="sm"
                size="sm"
                startContent={<SlUserFollowing />}
                onPress={handleUnfollow}
              >
                Following
              </Button>
            )}
            {currentUser && currentUser.role !== UserRoles.artist && (
              <Button
                color="default"
                radius="sm"
                startContent={<HiChat size={24} />}
                onClick={handleMessageMeClick}
              >
                Message Me
              </Button>
            )}
            {currentUser &&
              currentUser.role === UserRoles.artist &&
              artist.user.id !== currentUser.id &&
              connectionRequests &&
              !artistInRequest(connectionRequests, artist.id) &&
              !artistInConnections() && (
                <Button
                  color="warning"
                  isDisabled={connectingArtist}
                  isLoading={connectingArtist}
                  size="sm"
                  onPress={handleSendArtistConnection}
                >
                  Send Connection Request
                </Button>
              )}
            {connectionRequests &&
              artistInRequest(connectionRequests, artist.id) && (
                <Button isDisabled size="sm">
                  Request Sent
                </Button>
              )}

            {currentUserArtist && artistInConnections() && (
              <Button isDisabled>Connected</Button>
            )}
          </div>
          {currentUser && currentUser.is_active && (
            <>
              <Divider className="my-2" />
              <p className="text-xs mb-2 dark:text-white/30">
                Personal Details
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <ImLocation className="mr-2" size={20} />
                  {artist.user.profile?.complete_address && (
                    <p className="capitalize dark:text-white/60 text-xs ">
                      {artist.user.profile.complete_address}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <FaPhone className="mr-2" size={20} />
                  <p className=" dark:text-white/60 text-xs ">
                    {artist.user.profile?.phone}
                  </p>
                </div>
              </div>
            </>
          )}
          <Divider className="my-2" />
          <p className="text-xs mb-2 dark:text-white/30">Genres</p>
          <div className="flex space-x-2 w-full">
            {artist.genres?.map((genre) => (
              <Chip
                key={genre.id}
                className="capitalize dark:text-white"
                color="secondary"
                size="sm"
              >
                #{genre.name}
              </Chip>
            ))}
          </div>
          <Divider className="my-2" />
          <p className="mt-4 text-xs mb-2 dark:text-white/30">Packages</p>
          <Rates rates={artist.rates} />
          <Links artist={artist} />
        </div>
      </animated.div>
    </div>
  );
}

const Rates = ({ rates }: { rates: z.infer<typeof RateSchema>[] }) => {
  return (
    <div className=" flex flex-wrap gap-3">
      {rates.map((rate) => (
        <div key={rate.id} className=" w-1/6 p-1 border-[1px] border-blue-400/5 flex flex-col rounded-lg bg-white/5 gap-2 items-center">
          <p className="text-center text-md text-blue-400">
            &#8369;{Math.round(rate.amount)}
          </p>
          <p className="text-xs text-white/60 text-center">{rate.name}</p>

          <Spacer y={2} />
        </div>
      ))}
    </div>
  );
};
