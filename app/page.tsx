import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import MainLayout from "@/components/main-layout";

export default function Home() {
  return (
    <MainLayout>
      {" "}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
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
      </section>
    </MainLayout>
  );
}
