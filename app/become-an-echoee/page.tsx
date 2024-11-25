"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";

import { AnimatedComponent } from "@/components/animated-container";
import EchoLoading from "@/components/echo-loading";
import { Logo } from "@/components/icons";
import { useHasArtistApplicationQuery } from "@/redux/features/artistApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import useLoginRequired from "@/hooks/use-login-required";
import { Spinner } from "@nextui-org/spinner";
import { useEffect } from "react";

export default function BecomeEchoeePage() {
const {loginChecked} = useLoginRequired('/become-an-echoee')
  const { data: user, isLoading: isUserLoading } = useFetchCurrentUserQuery();
  const { isSuccess: noApplicationYet, isError: hasAlreadyApplied } =
    useHasArtistApplicationQuery();

    useEffect(() => {
        if (user && !user?.profile?.is_complete) {
          window.location.href = `/auth/register/profile?redirect=${encodeURIComponent(`/become-an-echoee`)}`;
        }
      }, [user]);

  if (isUserLoading) {
    return <EchoLoading />;
  }
  if (user && hasAlreadyApplied) {
    return <PendingApplicationModal />;
  }


  return (
    <div className="h-full flex items-center justify-center ">
      <Intro authenticating={!loginChecked}/>
    </div>
  );
}

const Intro = ({authenticating}:{authenticating:boolean}) => {
  const router = useRouter();
  const {data:currentUser, isLoading} = useFetchCurrentUserQuery()

  if(isLoading){
    return <EchoLoading />
  }


  return (
    <div className=" absolute top-0 left-0  w-screen h-screen ">
      <div className="relative w-full h-full flex items-center  bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex-col justify-center text-xl text-white">
        <div className="w-3/5 bg-black/70 relative rounded-2xl h-3/5 flex justify-center items-center flex-col">
        {!authenticating ?
        <>
          <p className="text-3xl mb-6">Become an Echoee</p>
          <p className="text-center w-2/4 leading-loose text-white/50">
            Be a part of the Echoee family, where every artist gets a chance to
            earn money and fame.
          </p>
          <Button
            className="mt-4"
            color="primary"
            radius="full"
            size="lg"
            onPress={() => router.push("/become-an-echoee/application")}
          >
            Apply Now
          </Button>
          </> :
          <Spinner /> }
          <div className="flex items-center gap-1 absolute top-4 left-8">
            <Logo />
            <p className="text-sm text-blue-400 font-bold">EchoEase</p>
          </div>

        </div>
        {currentUser &&
        <AnimatedComponent className="invisible lg:visible flex items-end overflow-hidden absolute bottom-0 left-2 ">
            {currentUser.profile?.gender === 'female' ?
            <Image src="/media/hero-girl.png" className="scale-110 " width={600} /> :
            <Image className="" src="/media/hero.png" width={700} />
        }

        </AnimatedComponent>
        }
      </div>
    </div>
  );
};

const PendingApplicationModal = () => {
  const router = useRouter();

  return (
    <div>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 z-50 flex items-center justify-center">
        <div className="w-full lg:w-2/5 bg-white/5 rounded-2xl p-8">
          <p className="text-xl mb-6 text-warning-500 ">
            Your Application is Pending
          </p>
          <p className=" w-2/4 mb-6 leading-loose text-gray-600">
            We&apos;re reviewing your application and will let you know when it&apos;s
            ready.
          </p>
          <Button
            className="mt-4"
            color="primary"
            radius="full"
            size="lg"
            onPress={() => router.push("/")}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
