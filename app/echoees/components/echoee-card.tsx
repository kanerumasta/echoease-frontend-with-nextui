"use client";

import { AnimatedSide } from "@/components/animated-side";
import CustomImage from "@/components/image";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function EchoeeCard({
  echoee,
}: {
  echoee: z.infer<typeof ArtistInSchema>;
}) {
  const router = useRouter();
  return (
    <AnimatedSide  className="max-w-[250px] min-w-[250px] min-h-[300px] p-2 bg-gradient-to-br from-blue-500/60 to-purple-400/60 rounded-md">
        <div className=" overflow-hidden rounded-md cursor-pointer" onClick={() => router.push(`/${echoee.slug}`)}>
        <div className="overflow-hidden rounded-md">
      <CustomImage
      className="hover:scale-110 duration-500 transition-all"
        width="100%"
        height="220px"
        src={`${process.env.NEXT_PUBLIC_HOST}${echoee.user.profile?.profile_image}`}
      />
      </div>
      <div className="capitalize py-2 text-white/70 font-bold text-xl">
        <p>{echoee.user.fullname}</p>
       {echoee.followers.length > 0 &&  <p className="text-xs">{echoee.followers.length} {echoee.followers.length > 1 ?"Followers" : "Follower"}</p>}
       {echoee.genres?.map((gen)=>(
        <span className="text-xs text-white/50 mr-1">#{gen.name}</span>
       ))}


      </div>
      </div>
    </AnimatedSide>
  );
}
