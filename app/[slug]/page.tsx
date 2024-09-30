"use client";

import useLoginRequired from "@/hooks/use-login-required";
import { useFetchDetailArtistBySlugQuery } from "@/redux/features/artistApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { notFound, useParams } from "next/navigation";
import Loading from "../auth/facebook/loading";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { BookingForm } from "./forms/booking-form";
import AboutSection from "./sections/about";
import { IntroductionSection } from "./sections/intro";
import { PortfolioSection } from "./sections/portfolio";
import EchoLoading from "@/components/echo-loading";

export default function SlugPage() {
  const params = useParams<{ slug: string }>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: currentUser } = useFetchCurrentUserQuery();
  const {
    data: artist,
    isLoading: isArtistLoading,
    isError: isArtistError,
  } = useFetchDetailArtistBySlugQuery(params.slug);

  const { loginChecked } = useLoginRequired(`/${params.slug}`);

  if (!loginChecked || isArtistLoading) return <EchoLoading />;

  if (isArtistError && loginChecked) {
    return notFound();
  }

  const handleBookPress = () => {
    //check if current user profile is not yet complete
    if (!currentUser?.profile?.is_complete) {
      window.location.href = `/auth/register/profile?redirect=${encodeURIComponent(`/${artist?.slug}`)}`;
    }
    //check if current user has no user role (organizer, regular, bar owner)
    else if (!currentUser.is_roled) {
      window.location.href = `/auth/register/picking-role?redirect=${encodeURIComponent(`/${artist?.slug}`)}`;
    } else {
      onOpen();
    }
  };
  return (
    <div className="flex w-full min-h-screen flex-col">
      {artist && <IntroductionSection artist={artist} />}
      <div className="">
        {artist && <AboutSection artist={artist} />}

        <Spacer y={8} />
        <h1 className="text-3xl text-center mb-8 font-bold text-blue-400">
          Portfolio
        </h1>
        {artist && <PortfolioSection artist={artist} />}
        {artist?.user.id !== currentUser?.id && (
          <Button
            onClick={handleBookPress}
            color="primary"
            className="fixed top-6 right-6 overflow-visible  rounded-full hover:-translate-y-1 px-12 shadow-xl bg-blue-500/70 animate-bounce after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-blue-500/80 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
          >
            Book Me
          </Button>
        )}
        <Modal
          size="3xl"
          onOpenChange={onOpenChange}
          scrollBehavior="outside"
          isDismissable={false}
          isKeyboardDismissDisabled={false}
          isOpen={isOpen}
        >
          {artist && <BookingForm artist={artist} />}
        </Modal>
      </div>
    </div>
  );
}
