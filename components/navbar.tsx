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

import {
  DiscordIcon,
  GithubIcon,
  Logo,
  SearchIcon,
  TwitterIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useLogout } from "@/hooks/auth";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { useCountNewNotificationsQuery, useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";
import { useIsCurrentUserAnArtist } from "@/utils/check-is-artist";
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
import { cn } from "@/lib/utils";
import { useFetchPendingBookingsQuery } from "@/redux/features/bookingApiSlice";

export const Navbar = () => {
  const { data: user, isLoading, isError } = useFetchCurrentUserQuery();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { logout } = useLogout();
  const router = useRouter();
  const { data: newNotifications =[]} = useFetchNewNotificationsQuery();
  const {data:pendingBookings} = useFetchPendingBookingsQuery()
  const currentPath = usePathname()

  const isActiveTab = useCallback((path:string)=>currentPath.includes(path),[currentPath])


  const { isArtist, isLoading: checkUserAnArtistLoading } =
    useIsCurrentUserAnArtist();

  const searchInput = (
    <Input
      radius="full"
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

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

        {!isArtist &&
           <NavbarItem >
           <Link className={cn("text-white/50 p-2 rounded-md",{"bg-blue-500 text-white":isActiveTab('/echoees')})} href={'/echoees'}>
                 Echoees
           </Link>
         </NavbarItem>
        }

        {isArtist &&
            <NavbarItem >
              <Link className={cn("text-white/50 p-2 rounded-md",{"bg-blue-500 text-white":isActiveTab('/echoverse')})} href={'/echoverse'}>
                    Echoverse
              </Link>
            </NavbarItem>
        }
            <NavbarItem >
              <Link className={cn("text-white/50 p-2 rounded-md",{"bg-blue-500 text-white":isActiveTab('/messages')})} href={'/messages'}>
                    Messages
              </Link>
            </NavbarItem>

            <NavbarItem>
  {!isArtist && (
    // pendingBookings.length > 0 ? (
    //   <Badge color="danger" content={pendingBookings.length}>
    //     <Link
    //       className={cn(
    //         "text-white/50 p-2 rounded-md",
    //         isActiveTab('/echoverse/bookings') && "text-white bg-blue-500"
    //       )}
    //       href={'/echoverse/bookings'}
    //     >
    //       Bookings
    //     </Link>
    //   </Badge>
    // ) : (
//       <Link
//         className={cn(
//           "text-white p-2 rounded-md",
//           isActiveTab('/echoverse/bookings') && "bg-blue-500"
//         )}
//         href={'/echoverse/bookings'}
//       >
//         Bookings
//       </Link>
//     )
//   ) : (
    <Link
      className={cn(
        "text-white p-2 rounded-md",
        isActiveTab('/bookings') && "bg-blue-500"
      )}
      href={'/bookings'}
    >
      Bookings
    </Link>
  )}
</NavbarItem>



        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {
            !(user?.role === 'artist') && (
                <NavbarItem>
                <Link className="text-white" href={"/become-an-echoee"}>
                  Become an echoee
                </Link>
              </NavbarItem>
            )
        }

        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          {/* <ThemeSwitch /> */}
        </NavbarItem>
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
            {newNotifications.length > 0 ?
            <Badge color="danger" content={newNotifications.length.toString()}>
              <IoNotifications
                className="hover:cursor-pointer"
                onClick={() => router.push("/notifications")}
                color="white"
                size={24}
              />
            </Badge> :  <IoNotifications
                className="hover:cursor-pointer"
                onClick={() => router.push("/notifications")}
                color="white"
                size={24}
              />
}
          </NavbarItem>
        )}

        <NavbarItem className="hidden md:flex">
          {user && (
            <Dropdown>
              <DropdownTrigger>
                <User
                  className="capitalize text-white hover:cursor-pointer"
                  name={`${user.first_name} ${user.last_name}`}
                  description={isArtist ? 'Echoee' :'Echoer'}
                  avatarProps={{
                    fallback: `${user.first_name[0]} ${user.last_name[0]}`,
                    src: `${process.env.NEXT_PUBLIC_HOST}${user.profile?.profile_image}`,
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="menu">
                <DropdownItem>
                  <div>
                    <p className="text-xs dark:text-white/50 text-black/50">
                      Signed in as
                    </p>
                    <p className="font-bold">{user.email}</p>
                  </div>
                </DropdownItem>
                <DropdownSection className="font-bold" showDivider>
                  <DropdownItem
                    onPress={() => {
                      isArtist
                        ? router.push("/echoverse")
                        : router.push("/profile");
                    }}
                    key={"profile"}
                  >
                    {isArtist ? 'Echoverse':'Profile'}
                  </DropdownItem>

                </DropdownSection>
                <DropdownSection>
                  <DropdownItem
                    onClick={onOpen}
                    key={"logout"}
                    className="text-danger"
                    color="danger"
                  >
                    Logout
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
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
              radius="sm"
              color="danger"
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
