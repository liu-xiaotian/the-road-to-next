"use client";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";
import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { signOut } from "@/app/features/auth/actions/sign-out";
import { SubmitButton } from "./form/submit-button";
import { getAuth } from "@/app/features/auth/queries/get-auth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/features/auth/hooks/use-auth";
const Header = () => {
  const { user, isFetching } = useAuth();

  if (isFetching) {
    return null;
  }
  const navItems = user ? (
    <>
      <form action={signOut}>
        <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
      </form>
    </>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );
  return (
    <nav
      className="
          animate-header-from-top
          supports-backdrop-blur:bg-background/60
          flxed left-0 right-0 top-0 z-20
          border-b bg-background/95 backdrop-blur
          w-full flex py-2.5 px-5 justify-between
        "
    >
      <div className="flex align-items gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
