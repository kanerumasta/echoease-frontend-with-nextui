// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useCallback, useMemo } from "react";
// import { FaCalendarAlt } from "react-icons/fa";
// import { ImBooks } from "react-icons/im";
// import { IoMdGitNetwork } from "react-icons/io";
// import { IoCalendar, IoPlanet } from "react-icons/io5";
// import { MdPerson } from "react-icons/md";
// import { RiFolderUserFill } from "react-icons/ri";

// import { cn } from "@/lib/utils";
// import MainLayout from "@/components/main-layout";

// export default function EchoverseLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathName = usePathname();
//   const router = useRouter();

//   return (
//     <MainLayout>
//       <div className="relative flex gap-2">
//         <Sidebar />
//         <div className="w-full rounded-lg pb-10  overflow-y-scroll scrollbar-hide">
//           {children}
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// const Sidebar = () => {
//   const currentPath = usePathname();
//   const router = useRouter();

//   const isActiveTab = useCallback(
//     (path: string) => {
//       const isActive = currentPath === path || currentPath.endsWith(path);

//       return isActive;
//     },
//     [currentPath],
//   );

//   const tabs = useMemo(
//     () => [
//       { href: "/echoverse", label: "Echohome", icon: <IoPlanet /> },
//       { href: "/echoverse/about", label: "About", icon: <MdPerson /> },
//       {
//         href: "/echoverse/portfolio",
//         label: "Portfolio",
//         icon: <RiFolderUserFill />,
//       },
//       { href: "/echoverse/bookings", label: "Bookings", icon: <ImBooks /> },
//       {
//         href: "/echoverse/upcoming-events",
//         label: "Upcoming Events",
//         icon: <IoCalendar />,
//       },
//       {
//         href: "/echoverse/schedule",
//         label: "Schedule",
//         icon: <FaCalendarAlt />,
//       },
//       {
//         href: "/echoverse/connections",
//         label: "My Connections",
//         icon: <IoMdGitNetwork />,
//       },
//     ],
//     [],
//   );

//   return (
//     <div className="h-full sticky top-20 border-[1px] border-white/10 min-w-[250px] overflow-hidden rounded-xl">
//       <ul className="bg-white/5 min-h-[80vh] flex flex-col rounded-md">
//         {tabs.map((tab) => (
//           <Link key={tab.href} href={tab.href}>
//             <li
//               className={cn("p-4 flex text-white/40 items-center gap-2", {
//                 "bg-blue-500 text-white font-bold": isActiveTab(tab.href),
//               })}
//             >
//               {tab.icon}
//               <span>{tab.label}</span>
//             </li>
//           </Link>
//         ))}
//       </ul>
//     </div>
//   );
// };

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { IoMdGitNetwork, IoMdSpeedometer } from "react-icons/io";
import { IoCalendar, IoPlanet, IoSpeedometer } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { RiFolderUserFill } from "react-icons/ri";

import { cn } from "@/lib/utils";
import MainLayout from "@/components/main-layout";

export default function EchoverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <MainLayout>
      <div className="relative flex gap-2">
        <Sidebar />
        <div className="w-full rounded-lg pb-10 overflow-y-scroll scrollbar-hide">
          {children}
        </div>
      </div>
    </MainLayout>
  );
}

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar
  const currentPath = usePathname();
  const router = useRouter();

  const isActiveTab = useCallback(
    (path: string) => {
      const isActive = currentPath === path || currentPath.endsWith(path);

      return isActive;
    },
    [currentPath],
  );

  const tabs = useMemo(
    () => [
      { href: "/echoverse", label: "Echohome", icon: <IoPlanet /> },
      { href: "/echoverse/about", label: "About", icon: <MdPerson /> },
      {
        href: "/echoverse/portfolio",
        label: "Portfolio",
        icon: <RiFolderUserFill />,
      },
      { href: "/echoverse/bookings", label: "Bookings", icon: <ImBooks /> },
      {
        href: "/echoverse/upcoming-events",
        label: "Upcoming Events",
        icon: <IoCalendar />,
      },
      {
        href: "/echoverse/schedule",
        label: "Schedule",
        icon: <FaCalendarAlt />,
      },
      {
        href: "/echoverse/connections",
        label: "My Connections",
        icon: <IoMdGitNetwork />,
      },
      {
        href:'/echoverse/feedbacks',
        label:'Feedbacks',
        icon:<IoSpeedometer />
      }
    ],
    [],
  );

  return (
    <div className="h-full sticky top-20 border-[1px] border-white/10 lg:min-w-[250px] overflow-hidden rounded-xl">
      {/* Sidebar toggle button for mobile */}
      <button
        className="md:hidden p-4 text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {/* Icon for toggle button (can use a hamburger menu or icon of your choice) */}
        &#9776;
      </button>

      {/* Sidebar content */}
      <div
        className={cn("min-h-[80vh] flex flex-col rounded-md bg-white/5", {
          block: isSidebarOpen,
          "hidden md:block": !isSidebarOpen, // Hide on small screens by default
        })}
      >
        <ul>
          {tabs.map((tab) => (
            <Link key={tab.href} href={tab.href}>
              <li
                className={cn("p-4 flex text-white/40 items-center gap-2", {
                  "bg-blue-500 text-white font-bold": isActiveTab(tab.href),
                })}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
