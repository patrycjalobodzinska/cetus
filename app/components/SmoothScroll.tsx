"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Natywne przewijanie (bez Lenis). Zachowuje jedynie scroll-to-top
// przy nawigacji "do przodu" (klik w link), pomijając back/forward.
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const prevPathnameRef = useRef<string | null>(null);
  const isPopStateRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isPopStateRef.current = true;
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      prevPathnameRef.current = pathname;
      return;
    }
    if (prevPathnameRef.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  return <>{children}</>;
}
