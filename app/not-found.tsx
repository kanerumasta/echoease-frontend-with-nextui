import { Spacer } from "@nextui-org/spacer";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });
const Bpoppins = Poppins({ subsets: ["latin"], weight: "800" });

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className={cn(
          "md:flex bg-white/5 rounded-xl p-4 items-center justify-center md:max-w-[800px] w-full m-auto mt-auto",
          poppins.className,
        )}
      >
        <div className="flex justify-center">
          <Image
            alt="Echobot"
            className="animate-wiggle"
            height={300}
            src={"/media/echo-bot.png"}
            width={300}
          />
        </div>

        <div className="space-y-1 flex flex-col items-center md:items-start">
          <h1
            className={cn(
              "uppercase text-blue-500 font-extrabold",
              Bpoppins.className,
            )}
          >
            page not found
          </h1>
          <h2
            className={cn(
              "uppercase text-3xl font-extrabold",
              Bpoppins.className,
            )}
          >
            oh no! error 404
          </h2>
          <Spacer y={2} />
          <p className="">
            Echobot is adrift in the Echoverse. Return to homepage
          </p>

          <Spacer y={8} />
          <Link
            className="p-4 rounded-full bg-blue-700 capitalize font-bold tracking-wider"
            href={"/"}
          >
            back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
