import { ReactNode } from 'react';

export type Locale = 'pl' | 'en';

export interface LocaleString {
  pl?: string;
  en?: string;
}

export interface LocaleStringArray {
  pl?: string[];
  en?: string[];
}

export interface ButtonConfig {
  text: string;
  link: string;
}

export interface ImageOverlay {
  value: string;
  label?: string;
  subLabel?: string;
  icon?: ReactNode;
}

