"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";

const Sidebar = () => {
  const [isTransition, setTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsOpen(!isOpen);
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
    }, 300);
  };

  return (
    <nav
      className={cn(
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78px]",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav>
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
