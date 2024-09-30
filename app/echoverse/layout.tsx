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

  return <MainLayout>
    <div className="flex">
    <Sidebar />
    {children}

    </div>
  </MainLayout>;
}


const Sidebar = () => {
    return <div className="  h-full rounded-xl">
        <ul className="bg-blue-500 rounded-md">
            <li className="p-4 border-2 border-red-300"><a href="/echoverse/about">About</a></li>
            <li className="p-4 border-2 border-red-300"><a href="/echoverse/portfolio">Portfolio</a></li>
            <li className="p-4 border-2 border-red-300"><a href="/bookings">Bookings</a></li>

        </ul>
    </div>
}
