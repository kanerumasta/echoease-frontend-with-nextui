import MainLayout from "@/components/main-layout";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
