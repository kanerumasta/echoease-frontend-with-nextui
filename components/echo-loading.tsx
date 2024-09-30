'use client'

import Image from "next/image";

export default function EchoLoading () {
    return <div className="flex center h-screen  items-center justify-center">
<div className="h-[100px] w-[100px] ">
        <img className="w-full h-full animate-rotate-x" alt="Echo Bot" width={100} height={100} src={"/media/echo-bot.png"}/>
        </div>
    </div>
}
