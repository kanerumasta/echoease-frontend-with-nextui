"use client";

import MainLayout from "@/components/main-layout";
import useIsArtistOnly from "@/hooks/use-is-artist-only";
import useLoginRequired from "@/hooks/use-login-required";
import { Tab, Tabs } from "@nextui-org/tabs";
import { notFound, useRouter } from "next/navigation";

export default function EchoverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loginChecked } = useLoginRequired("/echoverse");
  const { isArtist, isLoading, isError } = useIsArtistOnly();

  //login and isartist checking
  if (!loginChecked || isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !isArtist) {
    return notFound();
  }
  return <MainLayout>
    <div className="flex">
    <Sidebar />
    {children}

    </div>
  </MainLayout>;
}


const Sidebar = () => {
    return <div className="w-[100px]  h-full rounded-xl">
        <ul className="">
            <li className="p-4 bg-white/10 rounded-md">About</li>
            <li className="p-4 bg-white/10 rounded-md">About</li>
            <li className="p-4 bg-white/10 rounded-md">About</li>
            <li className="p-4 bg-white/10 rounded-md">About</li>
            <li className="p-4 bg-white/10 rounded-md">About</li>

        </ul>
    </div>
}
