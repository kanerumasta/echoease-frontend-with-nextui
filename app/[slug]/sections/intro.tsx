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
        "h-screen flex flex-col justify-center px-20 w-full ",
      )}
    >
      <div className="h-screen w-screen absolute top-0 right-0 overflow-hidden">
        {artist.user.profile?.profile_image && (
          <img
            alt="Artist Image"
            className="w-full h-full object-cover"
            src={artist.user.profile?.profile_image}
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="h-screen absolute top-0 left-0 w-full bg-gradient-to-r from-black via-black/70 to-black/35 " />
      <div className="z-10 space-y-4  w-2/4">
        <h1 className="text-3xl tracking-wide text-white/70">
          Hello! I'm your Echoee,
        </h1>
        <p className={cn(interBold.className, "text-7xl capitalize font-bold")}>
          {artist.user.fullname}
        </p>
        <p className="leading-loose text-lg text-white/50 ">{artist.bio} </p>
        {user && user.role !== UserRoles.artist && (
          <Button onPress={handleBookPress} className="bg-blue-500" radius="full" size="lg">
            Bring Me Onstage
          </Button>
        )}
      </div>
      {user && (
              <Modal
                classNames={{
                  base: "bg-white/5",
                  backdrop: "bg-black/80 backdrop-blur-xl",
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
