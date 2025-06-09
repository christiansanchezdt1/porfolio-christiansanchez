import type { LucideIcon } from "lucide-react";

export interface ContactInfo {
  id: string;
  icon: LucideIcon;
  text: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterLink {
  id: string;
  text: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  className?: string;
}
