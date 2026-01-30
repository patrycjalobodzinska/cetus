'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationContextType {
  startNavigation: () => void;
  isNavigating: boolean;
  progress: number;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

export default function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousPathnameRef = useRef<string>(pathname);

  const startNavigation = () => {
    setIsNavigating(true);
    setProgress(0);

    // Start progress animation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 90;
        }
        const increment = prev < 30 ? 15 : prev < 70 ? 8 : 3;
        return Math.min(prev + increment, 90);
      });
    }, 80);
  };

  useEffect(() => {
    // When pathname changes and we were navigating, complete the navigation
    if (isNavigating && pathname !== previousPathnameRef.current) {
      previousPathnameRef.current = pathname;
      setProgress(100);

      // Scroll to top when pathname changes
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Hide overlay after a short delay
      timeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 200);
    } else if (pathname !== previousPathnameRef.current) {
      // Also scroll to top even if navigation wasn't triggered by our system
      previousPathnameRef.current = pathname;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, isNavigating]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ startNavigation, isNavigating, progress }}>
      {children}
      {/* Progress Bar - shows during navigation */}
      {isNavigating && (
        <div
          className="fixed top-0 left-0 right-0 h-[1.5px] pointer-events-none z-[10000]"
          style={{
            opacity: 0.3,
          }}
        >
          <div
            className="h-full bg-blue-600 transition-all duration-200 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 8px rgba(37, 99, 235, 0.3)',
            }}
          />
        </div>
      )}
    </NavigationContext.Provider>
  );
}
