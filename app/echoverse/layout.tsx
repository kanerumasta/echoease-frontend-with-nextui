"use client";

import MainLayout from "@/components/main-layout";
import useIsArtistOnly from "@/hooks/use-is-artist-only";
import useLoginRequired from "@/hooks/use-login-required";
import { cn } from "@/lib/utils";
import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { IoChevronBack } from "react-icons/io5";

export default function EchoverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   
    const pathName = usePathname()
    const router = useRouter()
  return <MainLayout>
    <div className="">
    {pathName !== '/echoverse' &&
    <>

    <div className="p-2 hover:cursor-pointer" onClick={()=>router.replace('/echoverse')}><IoChevronBack /></div>
    <Sidebar />
    </>
    }

    {children}

    </div>
  </MainLayout>;
}


const Sidebar = () => {
    const currentPath = usePathname()
    const isActiveTab = useCallback((path:string)=>currentPath.includes(path),[currentPath])
    const tabs = useMemo(()=>[
        { href: "/echoverse/about", label: "About" },
        { href: "/echoverse/portfolio", label: "Portfolio" },
        { href: "/echoverse/bookings", label: "Bookings" },
        { href: "/echoverse/connections", label: "My Connections" },
    ],[])
    return <div className="  h-full rounded-xl">
        <ul className="bg-white/10 flex rounded-md">
        {tabs.map((tab) => (
          <Link key={tab.href} href={tab.href}>
            <li
              className={cn("p-4", {
                "bg-blue-500": isActiveTab(tab.href),
              })}
            >
              {tab.label}
            </li>
          </Link>
        ))}
        </ul>
    </div>
}
