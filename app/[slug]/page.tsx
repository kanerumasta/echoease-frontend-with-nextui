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
import EchoLoading from "@/components/echo-loading";
import { Footer } from "@/components/footer";
import useLoginRequired from "@/hooks/use-login-required";
import { useFetchDetailArtistBySlugQuery } from "@/redux/features/artistApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import AboutSection from "./sections/about";
import { IntroductionSection } from "./sections/intro";
import { PortfolioSection } from "./sections/portfolio";
import { Genres } from "./sections/genres";
import { Prices } from "./sections/prices";
import { AnimatedComponent } from "@/components/animated-container";

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
            <IntroductionSection firstOpen={firstOpen} setFirstOpen={setFirstOpen} slug={params.slug}  artist={artist} />
            <Spacer y={8} />

            <AboutSection artist={artist} />
            <AnimatedComponent className="">
            <Genres artist={artist}/>
            </AnimatedComponent>
            <AnimatedComponent className="">
            <Prices artist={artist}/>
            </AnimatedComponent>
            <Spacer y={8} />
            <h1 className="text-3xl text-center mb-8 font-bold text-blue-400">
              My Highlights
            </h1>
            {artist && <PortfolioSection artist={artist} />}

          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
