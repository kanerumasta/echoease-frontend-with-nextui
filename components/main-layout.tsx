import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import { Navbar } from "./navbar";
import { Footer } from "./footer";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        `relative flex flex-col bg-[#121212] bg-cover bg-center h-screen overflow-x-hidden overflow-y-scroll`,
        poppins.className,
      )}
    >
     {/* <div
        className="bg-gradient-to-b from-[#121212]/80 to-[#121212]/100 h-screen w-full fixed top-0 left-0 z-0 pointer-events-none"
        style={{ zIndex: 0 }}
      /> */}

      <div className="relative z-10">
        <Navbar />
        <main className="container pb-8 mb-12 mx-auto min-h-screen max-w-7xl pt-16 px-2 md:px-6 flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
