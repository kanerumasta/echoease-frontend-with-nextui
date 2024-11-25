import Link from "next/link";
import React from "react";

import { Logo } from "@/components/icons";
import MainLayout from "@/components/main-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
        {children}
    </MainLayout>
  );
}
