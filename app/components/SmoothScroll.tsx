"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const prevPathnameRef = useRef<string | null>(null);
  const isPopStateRef = useRef(false);

  useEffect(() => {
    // Disable browser's native scroll restoration - Lenis manages scroll
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePopState = () => {
      isPopStateRef.current = true;
    };
    window.addEventListener("popstate", handlePopState);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(raf);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    // Skip scroll-to-top on back/forward navigation
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      prevPathnameRef.current = pathname;
      return;
    }

    // Only scroll to top on forward navigation (link clicks)
    if (prevPathnameRef.current !== pathname) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  return <>{children}</>;
}
