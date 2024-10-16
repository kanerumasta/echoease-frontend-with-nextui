import MainLayout from "@/components/main-layout";
import React from "react";

export default function TransacitionLayout({children}:{children:React.ReactNode}){
    return <MainLayout>
{children}
    </MainLayout>
}
