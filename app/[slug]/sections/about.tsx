"use client";

import CustomImage from "@/components/image";
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
import { ArtistInSchema, ConnectionRequestSchema } from "@/schemas/artist-schemas";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Spacer } from "@nextui-org/spacer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaPhone } from "react-icons/fa";
import { HiChat } from "react-icons/hi";
import { ImLocation } from "react-icons/im";

import { RiUserFollowFill } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
import { z } from "zod";
import { Links } from "../components/links";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import { UserRoles } from "@/config/constants";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Ratings } from "../components/rating";
import { useFetchArtistRatingQuery } from "@/redux/features/reviewsApiSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Followers } from "../components/followers";


export default function AboutSection({artist}:{artist:z.infer<typeof ArtistInSchema>}) {

  const params = useParams<{ slug: string }>();
  const { refetch } = useFetchDetailArtistBySlugQuery(params.slug);
  const {data:connectionRequests, refetch:refetchConnectionRequests}  = useFetchConnectionRequestsQuery()
  const {data:ratingsData} = useFetchArtistRatingQuery(artist.id)

  const { refetch: refetchChats } = useFetchChatsQuery();
  const { data: currentUser, isLoading } = useFetchCurrentUserQuery();
  const {
    data: conversation,
  } = useFetchChatBySlugQuery(params.slug);
  const {data:currentUserArtist} = useFetchDetailCurrentArtistQuery()

  const [connectArtist, {isLoading:connectingArtist, isError:errorConnectingArtist, isSuccess:successConnectingArtist}] = useConnectArtistMutation()

  const [followArtist, { isLoading: followLoading, isError: followError }] =
    useFollowArtistMutation();
  const [
    unfollowArtist,
    { isLoading: unfollowLoading, isError },
  ] = useUnfollowArtistMutation();

  const router = useRouter();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const style = useSpring({
    opacity: inView ? 1 : 0, // Fade in effect
    transform: inView ? "translateY(0)" : "translateY(100px)", // Slide in effect
    config: { tension: 280, friction: 60 }, // Spring config
  });

  if (isLoading) return <div>Loading...</div>;

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

  const handleSendArtistConnection =()=>{
    const sender = currentUserArtist?.id
    const receiver = artist.id

    const payload = {
        "sender":sender,
        "receiver":receiver
    }
    connectArtist(payload)
  }

  const handleMessageMeClick = () => {
    refetchChats();
    router.push(`/messages/${conversation?.code}`);
  };

  const artistInRequest = (connectionRequests:z.infer<typeof ConnectionRequestSchema>[],artistId:number):boolean => {
    return connectionRequests.some(req => req.receiver.id === artistId);
  }
  const artistInConnections = () => {
    return currentUserArtist?.connections.includes(artist.id) || false
  }

  useEffect(()=>{
    if(successConnectingArtist){
        toast.success("Connection request sent.")
        refetchConnectionRequests()
    }
    if(errorConnectingArtist){
        toast.error("Connection request failed. Please try again.")
    }
  },[successConnectingArtist, errorConnectingArtist])



  return (
    <div className="flex gap-4 duration-1000 animate-appearance-in min-h-screen w-full">
      {/* Image Profile */}
      <animated.div
        ref={ref}
        style={style}
        className=" w-full md:w-[80%] min-h-[60%] bg-white/5 rounded-xl p-2 m-auto flex flex-col md:flex-row"
      >
        <CustomImage
          width="100%"
          height="100%"
          src={`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`}
        />
        <div className=" w-full px-5">
          <p className="text-blue-400 font-bold">About Me</p>
          <p className="capitalize lg:text-5xl md:text-3xl text-2xl font-bold">{`${artist.user.fullname}`}</p>

          {ratingsData && ratingsData.rating__avg && <Ratings rating={ratingsData.rating__avg}/>}
          <Spacer y={4}/>

          {artist?.followers?.length > 0 && (
            <Popover placement="bottom-start">
                <PopoverTrigger >
                <Chip className="hover:cursor-pointer" size="sm">{`${artist.followers?.length} Follower${artist.followers.length === 1 ? "" : "s"}`}</Chip>
                </PopoverTrigger>
                <PopoverContent>
                    <Followers artist={artist}/>
                </PopoverContent>
            </Popover>
          )}
          <Spacer y={4} />

          <div className="flex items-center gap-2">
            {currentUser && !artist.followers.includes(currentUser.id)&& currentUser.role !== UserRoles.artist   && (
              <Button
                startContent={<RiUserFollowFill size={24} />}
                isLoading={followLoading}
                onPress={handleFollow}
                radius="sm"
                color="primary"
              >
                Follow
              </Button>
            )}
            {currentUser && artist.followers.includes(currentUser.id)&& currentUser.role !== UserRoles.artist  && (
              <Button
                startContent={<SlUserFollowing size={24} />}
                onPress={handleUnfollow}
                isLoading={unfollowLoading}
                radius="sm"
              >
                Following
              </Button>
            )}
            {currentUser && currentUser.role !== UserRoles.artist &&
            <Button
              startContent={<HiChat size={24} />}
              onClick={handleMessageMeClick}
              color="default"
              radius="sm"
            >
              Message Me
            </Button>
}
            {currentUser && currentUser.role === UserRoles.artist && artist.user.id !== currentUser.id && connectionRequests && !artistInRequest(connectionRequests, artist.id) && !artistInConnections() &&
            <Button onPress={handleSendArtistConnection}  isLoading={connectingArtist} isDisabled={connectingArtist} color="warning">
                Send Connection Request
            </Button>
}
            {connectionRequests && artistInRequest(connectionRequests, artist.id) && <Button isDisabled>Request Sent</Button>}

            {currentUserArtist && artistInConnections() && <Button isDisabled>Connected</Button>}

          </div>
          <Spacer y={4} />
          <p className="text-sm mb-1 dark:text-white/30">Personal Details</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <ImLocation size={20} className="mr-2" />
              {artist.user.profile?.complete_address && (
                <p className="capitalize dark:text-white/60 text-md ">
                  {artist.user.profile.complete_address}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <FaPhone size={20} className="mr-2" />
              <p className=" dark:text-white/60 text-md ">
                {artist.user.profile?.phone}
              </p>
            </div>
          </div>
          <Spacer y={2} />
          <p className="text-sm mb-1 dark:text-white/30">Genres</p>
          <div className="flex space-x-2 w-full">
            {artist.genres?.map((genre) => (
              <Chip
                color="secondary"
                className="capitalize dark:text-white"
                key={genre.id}
              >
                #{genre.name}
              </Chip>
            ))}
          </div>
          <p className="text-sm mb-1 dark:text-white/30">Rate</p>
          <Links artist={artist} />
        </div>
      </animated.div>
    </div>
  );
}
