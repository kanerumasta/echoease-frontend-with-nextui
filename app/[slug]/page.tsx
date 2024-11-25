"use client";

import { useDisclosure } from "@nextui-org/modal";
import { Spacer } from "@nextui-org/spacer";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import EchoLoading from "@/components/echo-loading";
import { Footer } from "@/components/footer";
import useLoginRequired from "@/hooks/use-login-required";
import {
  useFetchArtistRatesQuery,
  useFetchDetailArtistBySlugQuery,
} from "@/redux/features/artistApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { AnimatedComponent } from "@/components/animated-container";
import {
  useFetchArtistScheduleDaysQuery,
  useFetchArtistUnavailableDatesQuery,
} from "@/redux/features/scheduleApiSlice";

import AboutSection from "./sections/about";
import { IntroductionSection } from "./sections/intro";
import { PortfolioSection } from "./sections/portfolio";
import { Genres } from "./sections/genres";
import { Prices } from "./sections/prices";
import { Reviews } from "./components/reviews";
import Connections from "./sections/connections";

export default function SlugPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const open = searchParams.get("open");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: currentUser, isLoading: currentUserLoading } =
    useFetchCurrentUserQuery();

  const router = useRouter();
  const [firstOpen, setFirstOpen] = useState(open === "1");
  const {
    data: artist,
    isLoading: isArtistLoading,
    isError: isArtistError,
  } = useFetchDetailArtistBySlugQuery(params.slug);

  const { data: rates } = useFetchArtistRatesQuery(
    artist ? artist.id.toString() : skipToken,
  );
  const { data: schedules } = useFetchArtistScheduleDaysQuery(
    artist ? artist.id : skipToken,
  );
  const { data: unavailableDates } = useFetchArtistUnavailableDatesQuery(
    artist ? artist.id : skipToken,
  );

  useEffect(() => {
    if (currentUser && !currentUser?.profile?.is_complete) {
      window.location.href = `/auth/register/profile?redirect=${encodeURIComponent(`/${params.slug}`)}`;
    }
  }, [currentUser]);

  const { loginChecked } = useLoginRequired(`/${params.slug}`);

  if (!loginChecked || isArtistLoading) return <EchoLoading />;

  if (isArtistError && loginChecked) {
    return notFound();
  }
  if (currentUserLoading) {
    return <EchoLoading />;
  }

  return (
    <>
      <div className="flex w-full min-h-screen flex-col">
        {artist && (
          <div>
            <IntroductionSection
              artist={artist}
              firstOpen={firstOpen}
              setFirstOpen={setFirstOpen}
              slug={params.slug}
            />
            <Spacer y={8} />

            <AboutSection artist={artist} />

            <AnimatedComponent className="">
              <Prices artist={artist} />
            </AnimatedComponent>
            <AnimatedComponent className="mt-12">
              <Genres artist={artist} />
            </AnimatedComponent>
            <Spacer y={8} />
            <h1 className="text-center mb-4 text-2xl font-bold tracking-wider text-blue-400">
              My Highlights
            </h1>
            {artist && <PortfolioSection artist={artist} />}
            {artist && <Reviews artistId={artist.id} />}
            {artist && <Connections artistId={artist.id} />}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
