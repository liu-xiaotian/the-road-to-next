import { accountProfilePath, homePath, ticketsPath } from "@/paths";
import { NavItem } from "./types";
import { LucideBook, LucideLibrary, LucideUser } from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    href: homePath(),
    icon: <LucideLibrary />,
  },
  {
    title: "My Tickets",
    href: ticketsPath(),
    icon: <LucideBook />,
  },
  {
    separator: true,
    title: "Account",
    icon: <LucideUser />,
    href: accountProfilePath(),
  },
];

export const closeClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
