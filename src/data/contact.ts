import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import type { ContactInfo, FooterSection } from "@/types/footer";

export const contactInfo: ContactInfo[] = [
  {
    id: "email",
    icon: Mail,
    text: "christiansanchezdt1@gmail.com",
    href: "mailto:christiansanchezdt1@gmail.com",
  },
  {
    id: "phone",
    icon: Phone,
    text: "+54 (351) 288-1348",
    href: "tel:+543512881348",
  },
  {
    id: "github",
    icon: Github,
    text: "GitHub",
    href: "https://github.com/christiansanchezdt1/",
    isExternal: true,
  },
  {
    id: "linkedin",
    icon: Linkedin,
    text: "LinkedIn",
    href: "https://www.linkedin.com/in/elvis-pino-b358b2127/",
    isExternal: true,
  },
  {
    id: "twitter",
    icon: Twitter,
    text: "Twitter",
    href: "https://twitter.com/elvisxd",
    isExternal: true,
  },
  {
    id: "instagram",
    icon: Instagram,
    text: "Instagram",
    href: "https://instagram.com/elvisxd",
    isExternal: true,
  },
];

export const footerSections: FooterSection[] = [
  {
    id: "navigation",
    title: "Navigation",
    links: [
      { id: "home", text: "Home", href: "#" },
      { id: "about", text: "About", href: "#about" },
      { id: "experience", text: "Experience", href: "#experience" },
      { id: "projects", text: "Projects", href: "#projects" },
      { id: "studies", text: "Studies", href: "#Studies" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    links: [
      { id: "resume", text: "Resume", href: "/resume.pdf", isExternal: true },
      { id: "blog", text: "Blog", href: "/blog" },
      { id: "portfolio", text: "Portfolio", href: "#projects" },
    ],
  },
];
