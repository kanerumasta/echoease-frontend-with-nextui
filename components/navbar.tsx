"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { Badge } from "@nextui-org/badge";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { User } from "@nextui-org/user";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useState } from "react";
import { IoChatbubble, IoNotifications } from "react-icons/io5";

import { useIsCurrentUserAnArtist } from "@/utils/check-is-artist";
import { useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useLogout } from "@/hooks/auth";
import { siteConfig } from "@/config/site";
import {
  DiscordIcon,
  GithubIcon,
  Logo,
  SearchIcon,
  TwitterIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { useFetchPendingBookingsQuery } from "@/redux/features/bookingApiSlice";
import { useFetchUnreadMessagesCountQuery } from "@/redux/features/chatApiSlice";
import { HiDotsVertical } from "react-icons/hi";
import { MdSupportAgent } from "react-icons/md";
import { FaGavel } from "react-icons/fa";

export const Navbar = () => {
  const { data: user, isLoading, isError } = useFetchCurrentUserQuery();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { logout } = useLogout();
  const router = useRouter();
  const { data: newNotifications = [] } = useFetchNewNotificationsQuery();
  const { data: pendingBookings } = useFetchPendingBookingsQuery();
  const currentPath = usePathname();
  const { data: unreadMessages } = useFetchUnreadMessagesCountQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActiveTab = useCallback(
    (path: string) => currentPath.includes(path),
    [currentPath],
  );

  const { isArtist, isLoading: checkUserAnArtistLoading } =
    useIsCurrentUserAnArtist();


  return (
    <NextUINavbar
      className="bg-black dark:bg-transparent"
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
        {/* Toggle */}
        <NavbarContent className="md:hidden w-[80px] " justify="start">
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            <NavbarBrand as="li" className="gap-3 max-w-fit">
                <NextLink className="flex justify-start items-center gap-1" href="/">
                    <Logo />
                    <p className="font-bold text-blue-400">EchoEase</p>
                </NextLink>
                </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex ">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
                <NextLink className="flex justify-start items-center gap-1" href="/">
                    <Logo />
                    <p className="font-bold text-blue-400">EchoEase</p>
                </NextLink>
                </NavbarBrand>
        </NavbarContent>


      <NavbarContent className="hidden md:flex basis-1/5 md:basis-full">

          {user && (
            <NavbarItem>
              <Link
                className={cn("text-white/50 p-2 rounded-md", {
                  "bg-blue-500 text-white": isActiveTab("/echoees"),
                })}
                href={"/echoees"}
              >
                Echoees
              </Link>
            </NavbarItem>
          )}

          {isArtist && (
            <NavbarItem>
              <Link
                className={cn("text-white/50 p-2 rounded-md", {
                  "bg-blue-500 text-white": isActiveTab("/echoverse"),
                })}
                href={"/echoverse"}
              >
                Echoverse
              </Link>
            </NavbarItem>
          )}
          {user && (
            <>
            {!isArtist && (
          <NavbarItem>
              <Link
                className={cn(
                  "text-white/50 p-2 rounded-md",
                  isActiveTab("/bookings") && "bg-blue-500 text-white",
                )}
                href={"/bookings"}
              >
                Bookings
              </Link>
          </NavbarItem>
            )}
          <NavbarItem>
            <Link className={cn(
                  "text-white/50 p-2 rounded-md",
                  isActiveTab("/transactions") && "bg-blue-500 text-white",
                )} href="/transactions">Transactions</Link>
          </NavbarItem>
          </>
          )}
      </NavbarContent>

      <NavbarContent
        className="basis-1/5 sm:basis-full"
        justify="end"
      >
        {!user && (
          <Fragment>
            <NavbarItem>
              <Button
                className="bg-primary"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                className=""
                onClick={() => router.push("/auth/register")}
              >
                Register
              </Button>
            </NavbarItem>
          </Fragment>
        )}
{user &&


<NavbarContent justify="end">
<NavbarItem>
              <Badge
                color="danger"
                content={unreadMessages?.unread_messages_count ?? 0}
                isInvisible={
                  !unreadMessages || unreadMessages?.unread_messages_count <= 0
                }
              >
                <IoChatbubble
                 className="hover:cursor-pointer"
                 color="white"
                 size={24}
                 onClick={() => router.push("/messages")}
                />


              </Badge>
            </NavbarItem>
            <NavbarItem >
              <Badge
                color="danger"
                content={newNotifications.length.toString()}
                isInvisible={!newNotifications || newNotifications.length <= 0}
              >
                <IoNotifications
                  className="hover:cursor-pointer"
                  color="white"
                  size={24}
                  onClick={() => router.push("/notifications")}
                />
              </Badge>
          </NavbarItem>

        {/* Profile */}
          <NavbarItem className="md:flex">
            <Dropdown>
              <DropdownTrigger>
                <User
                  avatarProps={{
                    fallback: `${user.first_name[0]} ${user.last_name[0]}`,
                    src: user.profile?.profile_image,
                  }}
                  className="capitalize text-white hover:cursor-pointer"
                  description={isArtist ? "Echoee" : ""}
                  name={`${user.first_name} ${user.last_name}`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="menu" variant="faded">
                <DropdownItem>
                  <div>
                    <p className="text-xs dark:text-white/50 text-black/50">
                      Signed in as
                    </p>
                    <p className="font-bold">{user.email}</p>
                  </div>
                </DropdownItem>
                <DropdownSection showDivider className="font-bold">
                  <DropdownItem
                    key={"profile"}
                    onPress={() => {
                      isArtist
                        ? router.push("/echoverse")
                        : router.push("/profile");
                    }}
                  >
                    {isArtist ? "Echoverse" : "Profile"}
                  </DropdownItem>
                  <DropdownItem
                    key={"terms"}
                    onPress={() => {
                     router.push("/terms-and-conditions")
                    }}
                  >
                    Terms & Conditions
                  </DropdownItem>
                  <DropdownItem
                    key={"terms"}
                    onPress={() => {
                     router.push("/support")
                    }}
                  >
                        Help & Chat Support
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection>
                  <DropdownItem
                    key={"logout"}
                    className="text-danger"
                    color="danger"
                    onClick={onOpen}
                  >
                    Logout
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
        </NavbarItem>
        </NavbarContent>
}
 </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
        {user && (
            <NavbarItem>
              <Link
                className={cn("w-full text-white/50 p-2 rounded-md", {
                  "text-blue-400": isActiveTab("/echoees"),
                })}
                href={"/echoees"}
              >
                Echoees
              </Link>
            </NavbarItem>
          )}

          {isArtist && (
            <NavbarItem>
              <Link
                className={cn("w-full text-white/50 p-2 rounded-md", {
                  "text-blue-400": isActiveTab("/echoverse"),
                })}
                href={"/echoverse"}
              >
                Echoverse
              </Link>
            </NavbarItem>
          )}
          {user && (
            <>
            <NavbarItem>
              <Badge
                color="danger"
                content={unreadMessages?.unread_messages_count ?? 0}
                isInvisible={
                  !unreadMessages || unreadMessages?.unread_messages_count <= 0
                }
              >
                <Link
                  className={cn("w-full text-white/50 p-2 rounded-md", {
                    "text-blue-400": isActiveTab("/messages"),
                  })}
                  href={"/messages"}
                >
                  Messages
                </Link>
              </Badge>
            </NavbarItem>

          <NavbarItem>
            {!isArtist && (
              <Link
                className={cn(
                  "w-full text-white/50 p-2 rounded-md",
                  isActiveTab("/bookings") && "text-blue-400",
                )}
                href={"/bookings"}
              >
                Bookings
              </Link>
            )}
          </NavbarItem>
          <NavbarItem>
            <Link className={cn(
                  "w-full text-white/50 p-2 rounded-md",
                  isActiveTab("/transactions") && "text-blue-400",
                )} href="/transactions">Transactions</Link>
          </NavbarItem>
          <NavbarItem>
          <Link className={cn(
                  "w-full text-white/50 p-2 rounded-md",
                  isActiveTab("/notifications") && "text-blue-400",
                )} href="/notifications">Notifications</Link>

          </NavbarItem>
          <NavbarItem>
          <Link className={cn(
                  "w-full text-white/50 p-2 rounded-md",
                  isActiveTab("/terms-and-conditions") && "text-blue-400",
                )} href="/terms-and-conditions">Terms and Conditions</Link>

          </NavbarItem>
          <NavbarItem>
          <Link className={cn(
                  "w-full text-white/50 p-2 rounded-md",
                  isActiveTab("/support") && "text-blue-400",
                )} href="/support">Help and Chat Support</Link>

          </NavbarItem>
          </>
          )}
        </div>
      </NavbarMenu>

      {/* LOGOUT MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <p>Logout</p>
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to logout?</p>
          </ModalBody>
          <ModalFooter>
            <Button radius="sm" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              radius="sm"
              variant="faded"
              onPress={() => logout()}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </NextUINavbar>
  );
};
