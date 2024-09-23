"use client";

import MainLayout from "@/components/main-layout";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useRouter } from "next/navigation";

export default function EchoverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <MainLayout>{children}</MainLayout>;
}
