import { Button } from "@nextui-org/button";
import { Poppins } from "next/font/google";
import { z } from "zod";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "@nextui-org/link";

import { ArtistInSchema } from "@/schemas/artist-schemas";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { UserRoles } from "@/config/constants";
import { cn } from "@/lib/utils";

import { BookingForm } from "../forms/booking-form";

const interReg = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const interBold = Poppins({
  subsets: ["latin"],
  weight: "800",
});

export const IntroductionSection = ({
  artist,
  slug,
  firstOpen,
  setFirstOpen,
}: {
  artist: z.infer<typeof ArtistInSchema>;
  slug: string;
  firstOpen: boolean;
  setFirstOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: user } = useFetchCurrentUserQuery();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const handleBookPress = () => {
    //check if current user profile is not yet complete
    if (!user?.profile?.is_complete) {
      window.location.href = `/auth/register/profile?redirect=${encodeURIComponent(`/auth/register/picking-role?redirect=/${artist?.slug}?open=1`)}`;
    }
    //check if current user has no user role (organizer, regular, bar owner)
    else if (!user.is_roled) {
      window.location.href = `/auth/register/picking-role?redirect=${encodeURIComponent(`/${artist?.slug}?open=1`)}`;
    } else {
      onOpen();
    }
  };

  const handleOpenchange = () => {
    onOpenChange();
    if (firstOpen) {
      setFirstOpen(false);
      router.replace(`/${slug}`, { scroll: false });
    }
  };

  return (
    <div
      className={cn(
        interReg.className,
        "h-screen flex flex-col lg:flex-row-reverse relative items-center justify-center lg:px-20  ",
      )}
    >
      <div className="absolute top-[50px] z-0 left-[-50px] blur-[120px]  h-[350px] w-[350px] rounded-full bg-gradient-to-br from-red-500/30 to-yellow-500/30" />
      <div className="absolute top-[350px] z-0 left-[60px] blur-[120px]   h-[350px] w-[350px] rounded-full  bg-gradient-to-br from-purple-500/50 to-blue-500/30" />
      <div className="absolute top-[150px] z-0 left-[240px] blur-[120px]   h-[350px] w-[350px] rounded-full  bg-gradient-to-br from-pink-500/30 to-fuchsia-500/30" />

      <div className="h-[600px] relative lg:w-[600px] w-full">
        {artist.user.profile?.profile_image && (
          <img
            alt="Artist Image"
            className="w-full z-50 h-full object-cover"
            height={100}
            src={artist.user.profile?.profile_image}
            width={100}
          />
        )}
      </div>

      <div className="z-10 space-y-4 mt-12 h-[600px]  lg:mt-0 w-screen flex flex-col justify-center  lg:w-2/4">
        <h1 className="text-3xl text-center lg:text-left tracking-wide text-white/70">
          Hello! I'm your Echoee,
        </h1>

        <p
          className={cn(
            interBold.className,
            "animate-text bg-gradient-to-r from-white to-blue-600 bg-clip-text text-transparent lg:text-7xl  text-5xl text-center  lg:text-left capitalize font-bold",
          )}
        >
          {artist.user.fullname}
        </p>

        <p className="leading-loose text-lg text-center lg:text-left text-white/50 w-full lg:max-w-[80%] ">
          {artist.bio}{" "}
        </p>
        <div className="flex items-center pt-12 px-4 lg:px-0 gap-6">
          {user && user.role !== UserRoles.artist && (
            <Button
              className="bg-blue-500 hover:scale-110 w-[300px]"
              radius="full"
              size="lg"
              onPress={handleBookPress}
            >
              Bring Me Onstage
            </Button>
          )}
          <div className="flex items-center gap-3">
            {artist.fb_link && (
              <SocialButton
                icon={
                  <IoLogoFacebook
                    className=" group-hover:text-blue-400 cursor-pointer"
                    color="#fff"
                    size={30}
                  />
                }
                link={artist.fb_link}
              />
            )}
            {artist.instagram && (
              <SocialButton
                icon={
                  <IoLogoInstagram
                    className="group-hover:text-blue-400 cursor-pointer"
                    color="#fff"
                    size={30}
                  />
                }
                link={artist.instagram}
              />
            )}
            {artist.spotify && (
              <SocialButton
                icon={
                  <FaSpotify
                    className="group-hover:text-blue-400 cursor-pointer"
                    color="#fff"
                    size={30}
                  />
                }
                link={artist.spotify}
              />
            )}
            {artist.twitter && (
              <SocialButton
                icon={
                  <BsTwitterX
                    className="group-hover:text-blue-400 cursor-pointer"
                    color="#fff"
                    size={25}
                  />
                }
                link={artist.twitter}
              />
            )}
            {artist.youtube && (
              <SocialButton
                icon={
                  <IoLogoYoutube
                    className="group-hover:text-blue-400 cursor-pointer"
                    color="#fff"
                    size={30}
                  />
                }
                link={artist.youtube}
              />
            )}
          </div>
        </div>
      </div>
      {user && (
        <Modal
          classNames={{
            backdrop: "bg-black/80 backdrop-blur-xl h-[100vh] w-screen",
            wrapper: "w-full p-10  h-[100vh]",
            base: "",
          }}
          isDismissable={false}
          isKeyboardDismissDisabled={false}
          isOpen={isOpen || firstOpen}
          scrollBehavior="outside"
          size="3xl"
          onOpenChange={handleOpenchange}
        >
          <BookingForm artist={artist} currentUser={user} />
        </Modal>
      )}
    </div>
  );
};

const SocialButton = ({ icon, link }: { icon: any; link: string }) => {
  const router = useRouter();

  return (
    <Link href={link}>
      <div className=" h-[40px] p-2 w-[40px] flex items-center justify-center rounded-full bg-blue-300/50">
        {icon}
      </div>
    </Link>
  );
};
