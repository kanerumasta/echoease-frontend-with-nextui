"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Bounce, ToastContainer } from "react-toastify";
import StoreProvider from "@/redux/provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

interface ToastProviderProps {
  children: React.ReactNode;
}

function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer transition={Bounce} position="bottom-left" autoClose={3000} />
    </>
  );
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <StoreProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <ToastProvider>{children}</ToastProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </StoreProvider>
  );
}
