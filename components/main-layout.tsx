import { Link } from "@nextui-org/link";
import { Navbar } from "./navbar";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative  flex flex-col bg-gradient-to-br from-black to-blue-900 via-black h-screen overflow-y-scroll",
        poppins.className
      )}
    >
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
    </div>
  );
}
