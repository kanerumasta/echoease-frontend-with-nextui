export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Echoease",
  description: "Book singers with ease",
  navItems: [
    {
      label: "Echoees",
      href: "/echoees",
    },

    {
      label: "Bookings",
      href: "/bookings",
    },
    {
      label: "Messages",
      href: "/messages",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
