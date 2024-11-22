"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { IoCalendarNumber, IoLogoWechat } from "react-icons/io5";

import StoreProvider from "@/redux/provider";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";
import {
  useFetchApprovedBookingsQuery,
  useFetchAwaitingDownpaymentBookingsQuery,
  useFetchPendingBookingsQuery,
} from "@/redux/features/bookingApiSlice";
import {
  useFetchChatsQuery,
  useFetchUnreadMessagesCountQuery,
} from "@/redux/features/chatApiSlice";

interface ToastProviderProps {
  children: React.ReactNode;
}

function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        autoClose={3000}
        pauseOnHover={false}
        position="top-right"
        transition={Bounce}
      />
    </>
  );
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <StoreProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <ToastProvider>
            <WebsocketProvider>{children}</WebsocketProvider>
          </ToastProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </StoreProvider>
  );
}

const WebSocketContext = React.createContext<WebSocket | null>(null);

type WebSocketProviderProps = {
  children: React.ReactNode;
};
const WebsocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const { refetch: refetchNewNotif } = useFetchNewNotificationsQuery();
  const { refetch: refetchPendingBookings } = useFetchPendingBookingsQuery();
  const { refetch: refetchAwaitingDownpayments } =
    useFetchAwaitingDownpaymentBookingsQuery();
  const { refetch: refetchApprovedBookings } = useFetchApprovedBookingsQuery();
  const { refetch: refetchUnreadMessagesCount } =
    useFetchUnreadMessagesCountQuery();
  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  const { refetch: refetchConversationList } = useFetchChatsQuery();

  React.useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_NOTIFICATION_WEBSOCKET;

    if (!socketUrl) {
      console.log("No WebSocket URL provided: app/providers.tsx");

      return;
    }
    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onmessage = (event) => {
      refetchNewNotif();
      const pathName = window.location.pathname;

      const data = JSON.parse(event.data);

      console.log(data);
      if (
        data.notification_type === "message" &&
        !pathName.includes("/messages/")
      ) {
        refetchUnreadMessagesCount();
      }
      if (data.notification_type === "message") {
        refetchConversationList();
        toast.success(data.message, {
          icon: <IoLogoWechat className="text-blue-500" size={45} />,
          closeButton: false,
          pauseOnHover: true,
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else if (data.notification_type === "application") {
        toast(data.message);
      } else {
        toast(data.message, {
          icon: <IoCalendarNumber size={45} />,
          pauseOnHover: false,
          autoClose: 3000,
        });
      }
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [
    refetchNewNotif,
    refetchPendingBookings,
    refetchApprovedBookings,
    refetchAwaitingDownpayments,
  ]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
