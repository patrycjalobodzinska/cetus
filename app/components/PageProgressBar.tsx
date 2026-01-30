'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Cleanup previous timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset and start progress
    setProgress(0);
    setIsLoading(true);
    startTimeRef.current = Date.now();

    // Simulate progress - szybko do 30%, potem wolniej
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 90;
        }
        // Szybko do 30%, potem wolniej
        const increment = prev < 30 ? 15 : prev < 70 ? 8 : 3;
        return Math.min(prev + increment, 90);
      });
    }, 80);

    // Complete progress when page is loaded
    // Używamy requestAnimationFrame dla lepszej synchronizacji
    const completeProgress = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setProgress(100);
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
        startTimeRef.current = null;
      }, 200);
    };

    // Sprawdzamy, czy strona jest już załadowana
    if (document.readyState === 'complete') {
      completeProgress();
    } else {
      window.addEventListener('load', completeProgress, { once: true });
      // Fallback timeout
      timeoutRef.current = setTimeout(completeProgress, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('load', completeProgress);
    };
  }, [pathname, searchParams]);

  // Wykrywanie kliknięć w linki
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href && !link.href.startsWith('#') && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:')) {
        const url = new URL(link.href);
        // Sprawdzamy, czy link prowadzi do innej strony w tej samej domenie
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          setProgress(0);
          setIsLoading(true);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname]);

  if (!isLoading && progress === 0) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[1.5px] pointer-events-none"
      style={{
        opacity: isLoading ? 0.2 : 0, // Bardzo ledwo widoczny
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <div
        className="h-full bg-blue-600 transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 8px rgba(37, 99, 235, 0.2)',
        }}
      />
    </div>
  );
}
