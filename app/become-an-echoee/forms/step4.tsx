'use client'

import { ArtistApplicationSchema } from "@/schemas/artist-schemas";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

//SOCIAL LINKS
//This form is where new artist can add all social links
export default function Step4 () {
    const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
    return (
      <Fragment>
        <Spacer y={4}/>
            <div>
            <p className="text-2xl font-semibold text-blue-400">Connect Your Socials on EchoEase</p>
            <p className="text-sm text-white/50">Link your profiles to enhance your visibility on EchoEase.</p>
        </div>
        <Spacer y={8}/>
        <Input
          {...form.register("twitter")}
          size="lg"
          radius="sm"
          startContent={<Image width={24} src="/media/twitter.png" />}
          placeholder="Paste your twitter here"
        />
        <Input
          {...form.register("fb_link")}
          size="lg"
          radius="sm"
          startContent={<Image width={24} src="/media/facebook.png" />}
          placeholder="Paste your facebook profile link"
        />
        <Input
          {...form.register("youtube")}
          size="lg"
          radius="sm"
          startContent={<Image width={24} src="/media/youtube.png" />}
          placeholder="Paste your youtube channel link"
        />
        <Input
          {...form.register("instagram")}
          size="lg"
          radius="sm"
          startContent={<Image width={24} src="/media/instagram.png" />}
          placeholder="Paste your instagram link"
        />
        <Input
          {...form.register("spotify")}
          size="lg"
          radius="sm"
          startContent={<Image width={24} src="/media/spotify.png" />}
          placeholder="Paste your spotify link"
        />
      </Fragment>
    );
  };
