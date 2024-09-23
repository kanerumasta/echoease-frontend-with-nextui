import MainLayout from "@/components/main-layout";

export default function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
