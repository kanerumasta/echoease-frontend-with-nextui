"use client";

import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { ArtistApplicationSchema } from "@/schemas/artist-schemas";

//SOCIAL LINKS
//This form is where new artist can add all social links
export default function Step4() {
  const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();

  return (
    <Fragment>
      <Spacer y={4} />
      <div>
        <p className="text-2xl font-semibold text-blue-400">
          Connect Your Socials on EchoEase
        </p>
        <p className="text-sm text-white/50">
          Link your profiles to enhance your visibility on EchoEase.
        </p>
      </div>
      <Spacer y={8} />
      <Input
        {...form.register("twitter")}
        label="X (formerly Twitter)"
        placeholder="Paste your twitter here"
        radius="sm"
        size="lg"
        startContent={<Image src="/media/xtwitter.png" width={24} />}
      />
      <Input
        {...form.register("fb_link")}
        label="Facebook"
        placeholder="Paste your facebook profile link"
        radius="sm"
        size="lg"
        startContent={<Image src="/media/facebook.png" width={24} />}
      />
      <Input
        {...form.register("youtube")}
        label="Youtube"
        placeholder="Paste your youtube channel link"
        radius="sm"
        size="lg"
        startContent={<Image src="/media/youtube.png" width={24} />}
      />
      <Input
        {...form.register("instagram")}
        label="Instagram"
        placeholder="Paste your instagram link"
        radius="sm"
        size="lg"
        startContent={<Image src="/media/instagram.png" width={24} />}
      />
      <Input
        {...form.register("spotify")}
        label="Spotify"
        placeholder="Paste your spotify link"
        radius="sm"
        size="lg"
        startContent={<Image src="/media/spotify.png" width={24} />}
      />
    </Fragment>
  );
}
