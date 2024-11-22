"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { FaHeadset, FaRocketchat } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbCurrencyPeso } from "react-icons/tb";
import { useRouter } from "next/navigation";

import { AnimatedComponent } from "@/components/animated-container";
import MainLayout from "@/components/main-layout";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";

export default function Home() {
  const router = useRouter();

  const { data: currentUser } = useFetchCurrentUserQuery();

  if (currentUser && currentUser.is_deactivated) {
    router.replace("/account-deactivated");
  }

  return (
    <MainLayout>
      <AnimatedComponent className="flex bg-cover bg-center min-h-[80vh] mb-20 flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block  max-w-2xl text-center justify-center">
          <div className="text-6xl font-bold">
            <span>
              Find Your <span>Perfect</span> Singer With{" "}
              <span className="font-bold animate-text bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Echoease
              </span>
              &nbsp;
            </span>

            <br />
          </div>
          <h2 className="text-2xl mt-4">Where Music Meets Opportunity.</h2>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
            href={"/echoees"}
          >
            Discover
          </Link>
        </div>
      </AnimatedComponent>
      <AnimatedComponent className="flex mb-40">
        <div className="relative overflow-hidden p-8 rounded-xl ">
          <div className="absolute blur-[120px] bottom-0 right-2 w-[300px] h-[300px] rotate-45 bg-blue-500" />
          <div className="absolute blur-[120px] top-[-5%] left-[-5%] w-[300px] h-[300px] rotate-45 bg-purple-500/20" />
          <div className="invisible overflow-hidden  lg:visible absolute bottom-0 right-[-10%]">
            <img src="/media/hero.png" width={700} />
          </div>

          <div className="  lg:w-3/4">
            <div className="">
              <h1 className="text-4xl font-bold mb-6 text-blue-400">
                Hire Singers with Ease
              </h1>
              <p className="leading-loose text-lg text-white/50 mb-4 w-[80%]">
                Browse and hire talented singers from EchoEase. Your payment is
                only collected after the event is successfully completed. Book
                securely, enjoy live performances.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Feature
                description="Find and hire echoees effortlessly. Each echoee lists their rates clearly, so you always know what you’ll pay—no hidden fees, just transparent pricing."
                icon={<TbCurrencyPeso className="text-blue-400" size={50} />}
                title="Upfront Pricing"
              />
              <Feature
                description="Communicate with echoees directly through instant messaging, ensuring smooth coordination and updates throughout the booking process."
                icon={<FaRocketchat className="text-blue-400" size={40} />}
                title="Real-Time Chat"
              />
              <Feature
                description="We securely hold your down payment after the artist confirms. In case of any issues, you’re covered with a full refund guarantee."
                icon={
                  <RiSecurePaymentFill className="text-blue-400" size={40} />
                }
                title="Booking Protection, Guaranteed"
              />
              <Feature
                description="Our EchoEase team is ready to assist with any inquiries or resolve issues, ensuring that your event is a success from start to finish."
                icon={<FaHeadset className="text-blue-400" size={40} />}
                title="We’re here for you"
              />
            </div>
          </div>
        </div>
      </AnimatedComponent>
    </MainLayout>
  );
}

type FeatureProps = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <AnimatedComponent className=" w-[300px] bg-blue-400/5 p-2 pt-8 rounded-md ">
      <div className="flex gap-4">
        <div>{icon}</div>
        <div>
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-white/50">{description}</p>
        </div>
      </div>
    </AnimatedComponent>
  );
};
