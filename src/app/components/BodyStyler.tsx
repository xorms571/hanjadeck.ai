"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyStyler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("signup")) {
      document.body.classList.add("signup-background");
    } else {
      document.body.classList.remove("signup-background");
    }
  }, [pathname]);

  return null
}
