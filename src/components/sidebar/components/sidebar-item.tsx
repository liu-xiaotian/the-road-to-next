"use client";
import { usePathname } from "next/navigation";
import { NavItem } from "../types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cloneElement } from "react";
import { closeClassName } from "../constants";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
};
const SidebarItem = ({ isOpen, navItem }: SidebarItemProps) => {
  const path = usePathname();
  const isActive = path === navItem.href;

  return (
    <>
      {navItem.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex h-12 justify-start",
          isActive && "bg-multed font-bold hover:bg-muted",
        )}
      >
        {cloneElement(
          navItem.icon,
          clsx({
            className: "h-5 w-5",
          }),
        )}
        <span
          className={cn(
            "absolute left-12 text-base duration-300",
            isOpen ? "md:block hidden" : "w-[78px]",
            !isOpen && closeClassName,
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
};
export { SidebarItem };
