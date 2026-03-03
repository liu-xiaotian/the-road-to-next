"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey,getCookieByKey } from "@/actions/cookies";
import { usePathname } from "next/navigation";

const RedirectToast = () => {
  const pathname = usePathname();
  useEffect(() => {
    const showCookieToast =  () => {
      const message =  getCookieByKey("toast");
      if (message) {
        toast.success(message);
        deleteCookieByKey("toast");
      }
    };
    showCookieToast();
  }, [pathname]);
  return null;
};

export { RedirectToast };