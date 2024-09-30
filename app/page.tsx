"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { GithubIcon } from "@/components/icons";
import MainLayout from "@/components/main-layout";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { useSpring } from "@react-spring/web";
import { AnimatedComponent } from "@/components/animated-container";
import { Spacer } from "@nextui-org/spacer";

export default function Home() {
  const springs = useSpring({
    from: { x: 0 },
    to: { x: 100 },
  });
  return (
    <MainLayout>
      <AnimatedComponent className="flex  min-h-[80vh] flex-col items-center justify-center gap-4 py-8 md:py-10">
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

      <AnimatedComponent className="h-[400] bg-blue-400 w-[200px]">
        skjdcf
      </AnimatedComponent>

      <AnimatedComponent className="h-[400] bg-red-300 w-[200px]">
        .lslkdknf
      </AnimatedComponent>
      <Spacer y={20} />
    </MainLayout>
  );
}
