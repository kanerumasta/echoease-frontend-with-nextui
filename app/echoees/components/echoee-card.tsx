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
    <AnimatedSide className="max-w-[250px] min-w-[250px] min-h-[300px] p-2 bg-white/75 rounded-md">
      <CustomImage
        width="100%"
        height="220px"
        src={`${process.env.NEXT_PUBLIC_HOST}${echoee.user.profile?.profile_image}`}
      />
      <div className="capitalize py-2 text-black font-bold text-xl">
        <p>{echoee.user.fullname}</p>
        <p></p>
        <Button onClick={() => router.push(`/${echoee.slug}`)} radius="sm">
          View Portoflio
        </Button>
      </div>
    </AnimatedSide>
  );
}
