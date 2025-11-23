"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyStyler() {
  const pathname = usePathname();
  const body = document.body;
  const footer = document.querySelector("footer");
  useEffect(() => {
    if (pathname.includes("signup") || pathname.includes("login")) {
      body.classList.add("dark-background");
      footer?.classList.add("dark-background");
    } else if (pathname.includes("learn/")) {
      body.classList.add("learn-background");
    } else {
      body.classList.remove("dark-background");
      footer?.classList.remove("dark-background");
      body.classList.remove("learn-background");
    }
  }, [pathname]);

  return null
}
