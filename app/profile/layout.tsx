//page for client profile

import MainLayout from "@/components/main-layout";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
