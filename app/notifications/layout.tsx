import MainLayout from "@/components/main-layout";

export default function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="bg-blue-400/5 p-12 h-full min-h-[80vh]">{children}</div>
    </MainLayout>
  );
}
