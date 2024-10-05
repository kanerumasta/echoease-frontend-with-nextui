import { Link } from "@nextui-org/link";
import { Navbar } from "./navbar";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div

    className={cn(
        `relative flex flex-col bg-mic-background bg-cover bg-center h-screen overflow-y-scroll`,
        poppins.className
      )}
    >
        <div style={{zIndex:0}} className="bg-gradient-to-b from-black/80 to-black/100 h-screen w-full fixed top-0 left-0 z-0"></div>
        <div className="relative z-10">
      <Navbar />
      <main className="container pb-8 mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      </div>
    </div>
  );
}
