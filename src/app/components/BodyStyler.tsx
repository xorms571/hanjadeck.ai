"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyStyler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("signup") || pathname.includes("login")) {
      document.body.classList.add("dark-background");
    } else {
      document.body.classList.remove("dark-background");
    }
  }, [pathname]);

  return null
}
