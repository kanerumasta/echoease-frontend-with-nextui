"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
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
import { Fragment, useCallback } from "react";
import { IoNotifications } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { MdSupportAgent } from "react-icons/md";
import { FaGavel } from "react-icons/fa";

import { useIsCurrentUserAnArtist } from "@/utils/check-is-artist";
import { useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useLogout } from "@/hooks/auth";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useFetchPendingBookingsQuery } from "@/redux/features/bookingApiSlice";
import { useFetchUnreadMessagesCountQuery } from "@/redux/features/chatApiSlice";

export const Navbar = () => {
  const { data: user, isLoading, isError } = useFetchCurrentUserQuery();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { logout } = useLogout();
  const router = useRouter();
  const { data: newNotifications = [] } = useFetchNewNotificationsQuery();
  const { data: pendingBookings } = useFetchPendingBookingsQuery();
  const currentPath = usePathname();
  const { data: unreadMessages } = useFetchUnreadMessagesCountQuery();

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
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-blue-400">EchoEase</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {!isArtist && (
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
              <NavbarItem>
                <Badge
                  color="danger"
                  content={unreadMessages?.unread_messages_count ?? 0}
                  isInvisible={
                    !unreadMessages ||
                    unreadMessages?.unread_messages_count <= 0
                  }
                >
                  <Link
                    className={cn("text-white/50 p-2 rounded-md", {
                      "bg-blue-500 text-white": isActiveTab("/messages"),
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
                      "text-white/50 p-2 rounded-md",
                      isActiveTab("/bookings") && "bg-blue-500 text-white",
                    )}
                    href={"/bookings"}
                  >
                    Bookings
                  </Link>
                )}
              </NavbarItem>
              <NavbarItem>
                <Link
                  className={cn(
                    "text-white/50 p-2 rounded-md",
                    isActiveTab("/transactions") && "bg-blue-500 text-white",
                  )}
                  href="/transactions"
                >
                  Transactions
                </Link>
              </NavbarItem>
            </>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {!(user?.role === "artist") && !user?.is_roled && user && (
          <NavbarItem>
            <Link className="text-white" href={"/become-an-echoee"}>
              Be an Echoee
            </Link>
          </NavbarItem>
        )}
        {!(user?.role === "artist") && !user?.is_roled && user && (
          <NavbarItem>
            <Link className="text-white" href={`/auth/register/picking-role`}>
              Be an Echoer
            </Link>
          </NavbarItem>
        )}

        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}

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
        {user && (
          <NavbarItem>
            {newNotifications.length > 0 ? (
              <Badge
                color="danger"
                content={newNotifications.length.toString()}
              >
                <IoNotifications
                  className="hover:cursor-pointer"
                  color="white"
                  size={24}
                  onClick={() => router.push("/notifications")}
                />
              </Badge>
            ) : (
              <IoNotifications
                className="hover:cursor-pointer"
                color="white"
                size={24}
                onClick={() => router.push("/notifications")}
              />
            )}
          </NavbarItem>
        )}

        <NavbarItem className="hidden md:flex">
          {user && (
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
          )}
        </NavbarItem>
        {user && (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light">
                  <HiDotsVertical />
                </Button>
              </DropdownTrigger>
              <DropdownMenu classNames={{ base: "" }}>
                <DropdownItem
                  key={"terms"}
                  classNames={{ wrapper: "bg-red-400" }}
                  startContent={<FaGavel />}
                  onClick={() => {}}
                >
                  Terms and Conditions
                </DropdownItem>
                <DropdownItem key={"help"} startContent={<MdSupportAgent />}>
                  <Link href="/support">Help and Chat Support</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
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
