import MainLayout from "@/components/main-layout";

export default function EchoeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
