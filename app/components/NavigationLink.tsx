'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useNavigation } from './NavigationProvider';

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function NavigationLink({
  href,
  children,
  className,
  onClick
}: NavigationLinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { startNavigation } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick();
    }

    // Start navigation progress
    startNavigation();

    // Navigate using Next.js router with transition
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
