

import MainLayout from "@/components/main-layout";


export default function BeEchoeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <MainLayout>{children}</MainLayout>;
}
