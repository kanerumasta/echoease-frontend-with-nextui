"use client";

import useIsArtistOnly from "@/hooks/use-is-artist-only";
import useLoginRequired from "@/hooks/use-login-required";
import { notFound } from "next/navigation";

//Artist Profile Page

export default function EchoversePage() {
    const { loginChecked } = useLoginRequired("/echoverse");
    const { isArtist, isLoading, isError } = useIsArtistOnly();

    //login and isartist checking
    if (!loginChecked || isLoading) {
      return <div>Loading...</div>;
    }

    if (!isLoading && !isArtist) {
      return notFound();
    }
  return (
    <div>
      <div>
        <MenuItem icon={"sd"} text="Echoverse" />
      </div>
    </div>
  );
}

const MenuItem = ({ icon, text }: { icon: any; text: string }) => {
  return <div></div>;
};
