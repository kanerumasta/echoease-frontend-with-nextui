
import { Logo } from "@/components/icons";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import React from "react";

export default function Layout({children}:{children:React.ReactNode}){
    return <div>
        {/* navbar */}
        <div className="h-[70px] flex items-center px-8 justify-between bg-gray-800">
            <div className="flex items-center gap-2">
            <Logo />
            <h1>EchoEASE</h1>
            </div>
            <Link href={`${process.env.NEXT_PUBLIC_SITE}/`}>Back to Home</Link>
        </div>
        {children}
        </div>
}
