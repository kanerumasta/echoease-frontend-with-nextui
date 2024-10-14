"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Bounce, toast, ToastContainer } from "react-toastify";
import StoreProvider from "@/redux/provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";
import { useFetchApprovedBookingsQuery, useFetchAwaitingDownpaymentBookingsQuery, useFetchPendingBookingsQuery } from "@/redux/features/bookingApiSlice";

interface ToastProviderProps {
  children: React.ReactNode;
}

function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer transition={Bounce} position="top-right" autoClose={3000} />
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
            <WebsocketProvider>
                {children}
            </WebsocketProvider>
            </ToastProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </StoreProvider>
  );
}

const WebSocketContext = React.createContext<WebSocket|null>(null)

type WebSocketProviderProps = {
    children: React.ReactNode;
}
const WebsocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const { refetch:refetchNewNotif } = useFetchNewNotificationsQuery();
    const{refetch:refetchPendingBookings} = useFetchPendingBookingsQuery()
    const {refetch:refetchAwaitingDownpayments} = useFetchAwaitingDownpaymentBookingsQuery()
    const {refetch:refetchApprovedBookings} = useFetchApprovedBookingsQuery()
    const [socket, setSocket] = React.useState<WebSocket | null>(null);

    React.useEffect(() => {
        const socketUrl = 'ws://localhost:8000/ws/notification/';
        const newSocket = new WebSocket(socketUrl);

        newSocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        newSocket.onmessage = (event) => {
            refetchNewNotif();
            const data = JSON.parse(event.data);

            toast.success(data.message);
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [ refetchNewNotif, refetchPendingBookings, refetchApprovedBookings, refetchAwaitingDownpayments]);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};
