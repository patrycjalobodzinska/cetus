export interface Project {
  title: string;
  description: string;
  slug: string;
  image?: string;
  order?: number;
  src?: string;
  link?: string;
}

export interface OfferData {
  title: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  projects: Project[];
}

export interface Module {
  icon: string;
  title: string;
  items: string[];
}

export interface Service {
  title: string;
  description: string;
  applications?: string[];
  effect?: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  hours?: string;
}
