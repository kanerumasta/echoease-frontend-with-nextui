import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="overflow-x-hidden" suppressHydrationWarning lang="en">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <head />
      <body
        className={clsx(
          "min-h-screen bg-black/80 w-screen font-sans antialiased ",
          fontSans.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: "class",
            forcedTheme: "dark",
            defaultTheme: "dark",
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
