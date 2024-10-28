"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { useSpring } from "@react-spring/web";
import { FaHeadset, FaRocketchat } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbCurrencyPeso } from "react-icons/tb";

import { AnimatedComponent } from "@/components/animated-container";
import { GithubIcon } from "@/components/icons";
import MainLayout from "@/components/main-layout";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";

export default function Home() {
  const springs = useSpring({
    from: { x: 0 },
    to: { x: 100 },
  });

  return (
    <MainLayout>
      <AnimatedComponent className="flex  min-h-[80vh] mb-20 flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className={title()}>Discover &nbsp;</h1>
          <h1 className={title({ color: "violet" })}> talented &nbsp;</h1>
          <br />
          <h1 className={title()}>
            singers and simplify your event booking with EchoEase
          </h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Where Music Meets Opportunity.
          </h2>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={"/search/echoees"}
          >
            Discover
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>
      </AnimatedComponent>
      <AnimatedComponent className="flex mb-40">
        <div className="relative bg-blue-400/10 p-8 rounded-xl">
          <AnimatedComponent className="invisible lg:visible absolute bottom-[-20%] right-[-10%]">
            <img src="/media/echo-mascot.png" width={400} />
          </AnimatedComponent>
          <div className="  lg:w-2/4">
            <div className="">
              <h1 className="text-4xl font-bold mb-6 text-blue-400">
                Hire Singers with Ease
              </h1>
              <p className="leading-loose text-lg text-white/50">
                Browse and hire talented singers from EchoEase. Your payment is
                only collected after the event is successfully completed. Book
                securely, enjoy live performances.
              </p>
            </div>
            <div className="flex flex-wrap">
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
    <AnimatedComponent className=" w-2/4 pt-8 rounded-md ">
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
