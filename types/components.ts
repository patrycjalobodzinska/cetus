import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { MotionValue } from 'framer-motion';

export interface PolygonCardProps {
  imageUrl?: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
  fallbackIcon?: ReactNode;
}

export interface PolygonAccordionProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  icon?: ReactNode;
  variant?: 'default' | 'button';
  isActive?: boolean;
}

export interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  emailLabel?: string;
  /** Adres zaciemniony przez `cloakEmail()` po stronie serwera. */
  emailToken?: string;
  showDivider?: boolean;
  className?: string;
}

export interface DecorativeImageProps {
  src: string;
  alt: string;
  overlay?: {
    value: string;
    label?: string;
    subLabel?: string;
    icon?: ReactNode;
  };
  /**
   * Jeśli true, obrazek będzie bez zaokrąglonych rogów.
   * Domyślnie false (zaokrąglone rogi).
   */
  noRadius?: boolean;
}

export interface StarGradientButtonProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  speed?: string;
  starColor?: string;
}

export type ImageItem = string | {
  src: string;
  alt?: string;
  name?: string;
  description?: string;
};

export interface DomeGalleryProps {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  title?: string;
}

export interface ItemDef {
  src: string;
  alt: string;
  name?: string;
  description?: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
}

export interface StickyCardProps {
  i: number;
  title: string;
  slug?: string;
  description: string;
  src?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  cardTop?: number;
}
