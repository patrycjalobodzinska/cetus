'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { locales } from '@/i18n';
import { Globe } from 'lucide-react';
import { useState, useTransition, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
  const params = useParams();
  const currentLocale = (params?.locale as string) || useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get pathname without locale prefix
  const getPathnameWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0] as any)) {
      segments.shift();
    }
    return segments.length > 0 ? '/' + segments.join('/') : '/';
  };

  const pathnameWithoutLocale = getPathnameWithoutLocale();

  const switchLocale = (newLocale: string) => {
    setIsOpen(false);
    setFocusedIndex(-1);
    const newPath = `/${newLocale}${pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale}`;
    startTransition(() => {
      router.push(newPath);
      router.refresh();
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev < locales.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen) {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : locales.length - 1));
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen && focusedIndex >= 0) {
        switchLocale(locales[focusedIndex]);
      } else if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      }
    }
  };

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && menuRef.current) {
      const menuItems = menuRef.current.querySelectorAll('[role="menuitem"]');
      if (menuItems[focusedIndex]) {
        (menuItems[focusedIndex] as HTMLElement).focus();
      }
    }
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center text-gray-800 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        aria-label="Zmień język"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          if (focusedIndex === -1) {
            setIsOpen(false);
          }
        }}
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="text-sm font-medium uppercase">{currentLocale}</span>
      </button>
      <div
        ref={menuRef}
        className={`absolute right-0 top-full mt-2 z-9999 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        role="menu"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          if (focusedIndex === -1) {
            setIsOpen(false);
          }
        }}
      >
        {locales.map((loc, index) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocusedIndex(index)}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
              currentLocale === loc ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
            }`}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
          >
            {loc === 'pl' ? 'Polski' : 'English'}
          </button>
        ))}
      </div>
    </div>
  );
}
