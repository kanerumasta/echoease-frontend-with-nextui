import { Button } from "@nextui-org/button";
import { Poppins } from "next/font/google";
import { z } from "zod";
import Image from "next/image";

import { UserRoles } from "@/config/constants";
import { cn } from "@/lib/utils";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { BookingForm } from "../forms/booking-form";
import { useRouter } from "next/navigation";
import { AnimatedSide } from "@/components/animated-side";
import { IoLogoFacebook, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

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
  slug:string,
  firstOpen: boolean,
  setFirstOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const { data: user } = useFetchCurrentUserQuery();
  const {isOpen,onOpen,onOpenChange} = useDisclosure()
  const router = useRouter()

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
        "h-screen flex  flex-row-reverse relative items-center justify-center px-20 w-full ",
      )}
    >



      <div className="h-[600px] ring-offset-transparent relative rounded-full flex items-center w-[600px]">
        {artist.user.profile?.profile_image && (
            <img
            alt="Artist Image"
            className="w-full rounded-full z-20 h-full object-cover"
            src={artist.user.profile?.profile_image}
            width={100}
            height={100}
            />
        )}
        <div className="bg-purple-500/10 blur-3xl h-full w-full scale-110 absolute top-0 left-0  "/>
      </div>

      <AnimatedSide className="z-10 space-y-4    flex flex-col justify-center  w-2/4">
        <h1 className="text-3xl tracking-wide text-white/70">
          Hello! I'm your Echoee,
        </h1>
        <p className={cn(interBold.className, "text-7xl capitalize font-bold")}>
          {artist.user.fullname}
        </p>
        <p className="leading-loose text-lg text-white/50 max-w-[80%] ">{artist.bio} </p>
        <div className="flex items-center gap-3">
        {user && user.role !== UserRoles.artist && (
          <Button  onPress={handleBookPress} className="bg-blue-500 w-[300px]" radius="full" size="lg">
            Bring Me Onstage
          </Button>
        )}
        {artist.fb_link &&
                <SocialButton icon={<IoLogoFacebook size={30} className="group-hover:text-blue-400 cursor-pointer"/>}/>
}
        {artist.instagram &&
            <SocialButton icon={<IoLogoInstagram size={30} className="group-hover:text-blue-400 cursor-pointer"/>}/>
     }
        {artist.spotify &&
                <SocialButton icon={<FaSpotify size={30} className="group-hover:text-blue-400 cursor-pointer"/>}/>
}
        {artist.twitter &&
                <SocialButton icon={<BsTwitterX size={30} className="group-hover:text-blue-400 cursor-pointer"/>}/>
}
        {artist.youtube && <SocialButton icon={<IoLogoYoutube size={30} className="group-hover:text-blue-400 cursor-pointer"/>}/>
        }
        </div>
      </AnimatedSide>
      {user && (
              <Modal
                classNames={{
                  backdrop: "bg-black/80 backdrop-blur-xl h-[100vh] w-screen",wrapper:'w-full p-10  h-[100vh]',base:''
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

            <div className="absolute top-[50px] left-[-50px] blur-[120px] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-red-500/30 to-yellow-500/30"/>
            <div className="absolute top-[350px] left-[60px] blur-[120px] h-[350px] w-[350px] rounded-full  bg-gradient-to-br from-purple-500/50 to-blue-500/50"/>
            <div className="absolute top-[150px] left-[240px] blur-[120px] h-[350px] w-[350px] rounded-full  bg-gradient-to-br from-pink-500/30 to-fuchsia-500/30"/>

    </div>
  );
};


const SocialButton = ({icon}:{icon:any}) => {
    return (
        <div className="border-2 h-[40px] p-2 w-[40px] flex items-center justify-center rounded-full border-blue-400">
            {icon}
        </div>
    )
}
