import { cn } from "@/lib/utils";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { Poppins } from "next/font/google";
import { z } from "zod";

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
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  return (
    <div
      className={cn(
        interReg.className,
        "h-screen flex flex-col justify-center px-20 w-full "
      )}
    >
      <div className="h-screen w-screen absolute top-0 right-0 overflow-hidden">
        <img
          width={100}
          className="w-full h-full object-cover"
          src={`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`}
        />
      </div>
      <div className="h-screen absolute top-0 left-0 w-full bg-gradient-to-r from-black via-black/90 to-black/35 "></div>
      <div className="z-10 space-y-4 ">
        <h1 className="text-3xl font-bold">Hello, My name is</h1>
        <p className={cn(interBold.className, "text-7xl capitalize font-bold")}>
          {artist.user.fullname}
        </p>
        <p>{artist.bio} </p>
      </div>
    </div>
  );
};
