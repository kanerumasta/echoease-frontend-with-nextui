import MainLayout from "@/components/main-layout";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
