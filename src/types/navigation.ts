import type React from "react";
export type NavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export type HeaderProps = {
  className?: string;
};
