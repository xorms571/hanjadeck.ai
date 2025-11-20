"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyStyler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("signup") || pathname.includes("login")) {
      document.body.classList.add("dark-background");
    } else if (pathname.includes("learn/")) {
      document.body.classList.add("learn-background");
    } else {
      document.body.classList.remove("dark-background");
      document.body.classList.remove("learn-background");
    }
  }, [pathname]);

  return null
}
