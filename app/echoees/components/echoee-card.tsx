"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";

import { ArtistInSchema } from "@/schemas/artist-schemas";
import CustomImage from "@/components/image";
import { AnimatedSide } from "@/components/animated-side";

export default function EchoeeCard({
  echoee,
}: {
  echoee: z.infer<typeof ArtistInSchema>;
}) {
  const router = useRouter();

  return (
    <AnimatedSide className="max-w-[250px] min-w-[250px] min-h-[300px] p-2 bg-gradient-to-br from-blue-500/60 to-purple-400/60 rounded-md">
      <div
        className=" overflow-hidden rounded-md cursor-pointer"
        onClick={() => router.push(`/${echoee.slug}`)}
      >
        <div className="overflow-hidden rounded-md">
          {echoee.user.profile && (
            <CustomImage
              className="hover:scale-110 duration-500 transition-all"
              height="220px"
              src={echoee.user.profile?.profile_image}
              width="100%"
            />
          )}
        </div>
        <div className="capitalize py-2 text-white/70 font-bold text-xl">
          <p>{echoee.stage_name ? echoee.stage_name : echoee.user.fullname}</p>
          {echoee.followers.length > 0 && (
            <p className="text-xs">
              {echoee.followers.length}{" "}
              {echoee.followers.length > 1 ? "Followers" : "Follower"}
            </p>
          )}
          {echoee.genres?.map((gen) => (
            <span key={gen.id} className="text-xs text-white/50 mr-1">
              #{gen.name}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSide>
  );
}
