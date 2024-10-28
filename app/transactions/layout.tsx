import React from "react";

import MainLayout from "@/components/main-layout";

export default function TransacitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
